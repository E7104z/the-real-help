/**
 * THE REAL HELP, LLC — Google Apps Script CRM Automation
 * FULL VERSION — Bulk Email + Templates + Selected Rows
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────

var JASON_EMAIL = "jasonhgriffin@gmail.com";
var BOOKING_URL = "https://cal.com/jason-griffin-0covhm";
var SHEET_NAME_LEADS = "Lead Pipeline";
var SHEET_NAME_FOLLOWUPS = "FollowUp Queue";
var SHEET_NAME_ACTIVE = "Active Clients";
var SHEET_NAME_CLOSEDWON = "ClosedWon";
var SHEET_NAME_DEAD = "Dead Leads";
var SHEET_NAME_BULK_LOG = "Bulk Email Log";
var SHEET_NAME_TEMPLATES = "Email Templates";

var MAX_EMAILS_PER_BATCH = 100;
var EMAIL_DELAY_MS = 1000;

// ─── ENTRY POINT ───────────────────────────────────────────────────────────

function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  switch (data.action) {
    case 'submitContact':
      addLeadToSheet(data);
      sendNotificationEmail(data);
      sendAutoReply(data);
      scheduleFollowUps(data);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);

    case 'welcomeClient':
      sendWelcomeClientEmail(data.clientName, data.clientEmail, data.service, data.resetLink);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);

    case 'saveTemplate':
      return saveEmailTemplate(data);

    case 'getTemplates':
      return getEmailTemplates();

    case 'deleteTemplate':
      return deleteEmailTemplate(data.templateId);

    case 'propertyTransfer':
      return handlePropertyTransfer(data);

    default:
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Unknown action'
        }))
        .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── LEAD SHEET ────────────────────────────────────────────────────────────

function addLeadToSheet(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_LEADS);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME_LEADS);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Date", "Name", "Email", "Phone", "Service",
      "Message", "Status", "Follow Up Date", "Notes", "Source", "Lead ID"
    ]);
    sheet.getRange(1, 1, 1, 11).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  var followUpDate = new Date();
  followUpDate.setDate(followUpDate.getDate() + 2);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.service || "",
    data.message || "",
    "New",
    followUpDate,
    "",
    "Website",
    data.leadId || ""
  ]);
}

// ─── NOTIFICATION EMAIL (to Jason) ─────────────────────────────────────────

function sendNotificationEmail(data) {
  var subject = "New Lead: " + (data.name || "Unknown") + (data.service ? " — " + data.service : "");

  var body = [
    "New contact form submission on therealhelp.com",
    "",
    "Name:    " + (data.name || "—"),
    "Email:   " + (data.email || "—"),
    "Phone:   " + (data.phone || "—"),
    "Service: " + (data.service || "—"),
    "",
    "Message:",
    data.message || "—",
    "",
    "──────────────────────────",
    "View in Google Sheets: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  ].join("\n");

  GmailApp.sendEmail(JASON_EMAIL, subject, body);
}

// ─── AUTO-REPLY (to lead) ──────────────────────────────────────────────────

function sendAutoReply(data) {
  if (!data.email) return;

  var firstName = (data.name || "").split(" ")[0] || "there";

  var body = [
    "Hi " + firstName + ",",
    "",
    "Thanks for reaching out. I received your message and will get back to you within 1 business day.",
    "",
    "If you'd rather talk sooner, you can book a free 30-minute call here:",
    BOOKING_URL,
    "",
    "Looking forward to talking with you.",
    "",
    "— Jason",
    "The Real Help, LLC",
    "therealhelp.com"
  ].join("\n");

  sendEmailWithSig(data.email, "Got your message — The Real Help, LLC", body, {
    name: "Jason — The Real Help, LLC",
    replyTo: JASON_EMAIL
  });
}

// ─── WELCOME CLIENT EMAIL ─────────────────────────────────────────────────

function sendWelcomeClientEmail(name, email, service, resetLink) {
  if (!email) return;

  var firstName = (name || "").split(" ")[0] || "there";
  var portalUrl = "https://therealhelp.com/portal/login";

  var body = [
    "Hi " + firstName + ",",
    "",
    "Welcome to The Real Help, LLC" + (service ? " — " + service : "") + "!",
    "",
    "Your client portal account has been created. Use the link below to set your password and log in:",
    "",
    resetLink || portalUrl,
    "",
    "Once you're logged in you can:",
    "  • Track your project milestones",
    "  • Upload and view documents",
    "  • Message us directly",
    "",
    "If you have any questions just reply to this email — I'm here to help.",
    "",
    "— Jason",
    "The Real Help, LLC",
    "therealhelp.com"
  ].join("\n");

  sendEmailWithSig(email, "Your portal is ready — The Real Help, LLC", body, {
    name: "Jason — The Real Help, LLC",
    replyTo: JASON_EMAIL
  });
}

// ─── SCHEDULE FOLLOW-UPS ──────────────────────────────────────────────────

function scheduleFollowUps(data) {
  if (!data.email) return;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_FOLLOWUPS);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME_FOLLOWUPS);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Scheduled Date", "Name", "Email", "Service", "Type", "Status", "Lead ID"]);
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  var day2 = new Date();
  day2.setDate(day2.getDate() + 2);

  var day5 = new Date();
  day5.setDate(day5.getDate() + 5);

  sheet.appendRow([day2, data.name || "", data.email, data.service || "", "Day2", "Pending", data.leadId || ""]);
  sheet.appendRow([day5, data.name || "", data.email, data.service || "", "Day5", "Pending", data.leadId || ""]);
}

// ─── DAILY FOLLOW-UP PROCESSOR ────────────────────────────────────────────

function processFollowUps() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_FOLLOWUPS);
  if (!sheet || sheet.getLastRow() <= 1) return;

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var scheduledDate = new Date(row[0]);
    scheduledDate.setHours(0, 0, 0, 0);
    var name    = row[1];
    var email   = row[2];
    var service = row[3];
    var type    = row[4];
    var status  = row[5];

    if (status !== "Pending") continue;
    if (scheduledDate > today) continue;

    try {
      if (type === "Day2") sendDay2FollowUp(name, email, service);
      else if (type === "Day5") sendDay5FollowUp(name, email, service);
      sheet.getRange(i + 1, 6).setValue("Sent");
    } catch (err) {
      sheet.getRange(i + 1, 6).setValue("Error: " + err.message);
    }
  }
}

// ─── FOLLOW-UP EMAILS ─────────────────────────────────────────────────────

function sendDay2FollowUp(name, email, service) {
  var firstName = (name || "").split(" ")[0] || "there";

  var body = [
    "Hi " + firstName + ",",
    "",
    "Just wanted to follow up on your message" + (service ? " about " + service : "") + ". I want to make sure your questions don't fall through the cracks.",
    "",
    "If you're ready to talk, book a free 30-minute call here:",
    BOOKING_URL,
    "",
    "Or just reply to this email — happy to answer any questions.",
    "",
    "— Jason",
    "The Real Help, LLC"
  ].join("\n");

  sendEmailWithSig(email, "Just checking in — The Real Help", body, {
    name: "Jason — The Real Help, LLC",
    replyTo: JASON_EMAIL
  });
}

function sendDay5FollowUp(name, email, service) {
  var firstName = (name || "").split(" ")[0] || "there";

  var body = [
    "Hi " + firstName + ",",
    "",
    "I know you're busy. I just wanted to leave the door open in case the timing wasn't right before.",
    "",
    service ? "If you still need help with " + service + ", I'm here." : "If you still need help, I'm here.",
    "",
    "No pressure either way — just book when you're ready:",
    BOOKING_URL,
    "",
    "Wishing you the best,",
    "",
    "— Jason",
    "The Real Help, LLC"
  ].join("\n");

  sendEmailWithSig(email, "Leaving the door open — The Real Help", body, {
    name: "Jason — The Real Help, LLC",
    replyTo: JASON_EMAIL
  });
}

// ─── CAMPAIGN TEMPLATES ───────────────────────────────────────────────────

function saveEmailTemplate(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_TEMPLATES);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_TEMPLATES);
    sheet.appendRow(["ID", "Campaign Name", "Target List", "Subject Line", "Body", "Last Sent", "Created Date"]);
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  var id = Utilities.getUuid();

  sheet.appendRow([
    id,
    data.campaignName || "",
    data.targetList || "",
    data.subject || "",
    data.body || "",
    "",
    new Date()
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Template saved successfully',
      id: id
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getEmailTemplates() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_TEMPLATES);

  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, templates: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  var templates = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) {
      templates.push({
        id: data[i][0],
        campaignName: data[i][1],
        targetList: data[i][2],
        subject: data[i][3],
        body: data[i][4],
        lastSent: data[i][5] ? data[i][5].toString() : "",
        createdDate: data[i][6] ? data[i][6].toString() : ""
      });
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true, templates: templates }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Returns a plain object for use with google.script.run (not ContentService)
function getEmailTemplatesForDialog() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_TEMPLATES);
  if (!sheet) return { success: true, templates: [] };

  var data = sheet.getDataRange().getValues();
  var templates = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) {
      templates.push({
        id: data[i][0],
        campaignName: data[i][1],
        subject: data[i][3],
        body: data[i][4]
      });
    }
  }
  return { success: true, templates: templates };
}

function updateTemplateLastSent(templateId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_TEMPLATES);
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === templateId) {
      sheet.getRange(i + 1, 6).setValue(new Date());
      break;
    }
  }
}

function deleteEmailTemplate(templateId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_TEMPLATES);

  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Template sheet not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === templateId) {
      sheet.deleteRow(i + 1);
      break;
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── BULK EMAIL ───────────────────────────────────────────────────────────

function sendBulkEmail(config) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(config.sheetName);
  if (!sheet) throw new Error("Sheet '" + config.sheetName + "' not found");

  var logSheet = ensureBulkEmailLogSheet();
  var campaignId = generateCampaignId();
  var startTime = new Date();

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { success: false, message: "No data in sheet" };

  var headers    = data[0];
  var nameCol    = headers.indexOf("Name");
  var emailCol   = headers.indexOf("Email");
  var phoneCol   = headers.indexOf("Phone");
  var serviceCol = headers.indexOf("Service") !== -1 ? headers.indexOf("Service") : headers.indexOf("Service Interested In");
  var statusCol  = headers.indexOf("Status");

  if (emailCol === -1) throw new Error("Email column not found in sheet");

  var recipients = [];
  var seenEmails = {};

  for (var i = 1; i < data.length; i++) {
    var row     = data[i];
    var email   = row[emailCol];
    var name    = nameCol !== -1 ? row[nameCol] : "";
    var phone   = phoneCol !== -1 ? row[phoneCol] : "";
    var service = serviceCol !== -1 ? row[serviceCol] : "";
    var status  = statusCol !== -1 ? row[statusCol] : "";

    if (!email || email.toString().trim() === "") continue;
    email = email.toString().trim().toLowerCase();
    if (seenEmails[email]) continue;

    if (config.filters) {
      var pass = true;
      if (config.filters.status && status !== config.filters.status) pass = false;
      if (config.filters.service && service !== config.filters.service) pass = false;
      if (!pass) continue;
    }

    seenEmails[email] = true;
    recipients.push({
      email: email,
      name: name,
      firstName: name ? name.split(" ")[0] : "",
      phone: phone,
      service: service,
      status: status
    });
  }

  if (recipients.length === 0) return { success: false, message: "No recipients match filters" };
  if (recipients.length > MAX_EMAILS_PER_BATCH) throw new Error("Exceeds max batch size of " + MAX_EMAILS_PER_BATCH);

  if (config.previewOnly) {
    return { success: true, preview: true, recipientCount: recipients.length };
  }

  var sentCount  = 0;
  var errorCount = 0;
  var errors     = [];

  for (var k = 0; k < recipients.length; k++) {
    try {
      sendEmailWithSig(
        recipients[k].email,
        applyMergeFields(config.subject, recipients[k]),
        applyMergeFields(config.body, recipients[k]),
        { name: "Jason — The Real Help, LLC", replyTo: JASON_EMAIL }
      );
      sentCount++;
      if (k < recipients.length - 1) Utilities.sleep(EMAIL_DELAY_MS);
    } catch (err) {
      errorCount++;
      errors.push({ email: recipients[k].email, error: err.message });
    }
  }

  var endTime = new Date();

  logCampaignSummary(logSheet, {
    campaignId: campaignId,
    campaignName: config.campaignName || "Unnamed Campaign",
    sheetName: config.sheetName,
    filters: JSON.stringify(config.filters || {}),
    totalRecipients: recipients.length,
    sentCount: sentCount,
    errorCount: errorCount,
    startTime: startTime,
    endTime: endTime,
    durationSeconds: (endTime - startTime) / 1000
  });

  return {
    success: true,
    campaignId: campaignId,
    sentCount: sentCount,
    errorCount: errorCount,
    totalRecipients: recipients.length,
    errors: errors
  };
}

// ─── SEND TO SELECTED ROWS ────────────────────────────────────────────────

function menuSendToSelectedRows() {
  var ss        = SpreadsheetApp.getActiveSpreadsheet();
  var sheet     = ss.getActiveSheet();
  var selection = sheet.getActiveRange();

  if (!selection) {
    SpreadsheetApp.getUi().alert('No Selection', 'Please select one or more rows first.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  var startRow = selection.getRow();
  var numRows  = selection.getNumRows();

  if (startRow === 1) {
    SpreadsheetApp.getUi().alert('Invalid Selection', 'Do not select the header row. Select data rows only.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  var html = HtmlService.createHtmlOutput(
    '<style>' +
    'body{font-family:Arial,sans-serif;padding:20px;}' +
    'label{display:block;margin-top:14px;font-weight:bold;}' +
    'input,select,textarea{width:100%;padding:8px;margin-top:5px;box-sizing:border-box;}' +
    'textarea{height:180px;font-family:monospace;}' +
    'button{margin-top:20px;padding:10px 22px;background:#1E3A8A;color:white;border:none;cursor:pointer;border-radius:4px;font-size:14px;}' +
    'button:hover{background:#163080;}' +
    '.info{background:#e8f0fe;padding:10px;border-radius:4px;margin-bottom:15px;font-size:13px;}' +
    '.help{font-size:11px;color:#666;font-style:italic;margin-top:3px;}' +
    '</style>' +
    '<h2>✉️ Email Selected Rows</h2>' +
    '<div class="info">' +
    '📊 <strong>' + sheet.getName() + '</strong> &nbsp;|&nbsp; ' +
    '📍 Rows <strong>' + startRow + '&ndash;' + (startRow + numRows - 1) + '</strong> (' + numRows + ' recipient' + (numRows !== 1 ? 's' : '') + ')' +
    '</div>' +
    '<label>Campaign Name:</label>' +
    '<input type="text" id="campaignName" placeholder="e.g., Follow-Up — March 2026"/>' +
    '<label>Load a Saved Template:</label>' +
    '<select id="templatePicker"><option value="">Loading templates…</option></select>' +
    '<label>Subject:</label>' +
    '<input type="text" id="subject" placeholder="Use {{firstName}}, {{name}}, {{service}}"/>' +
    '<p class="help">Merge fields: {{firstName}} &nbsp;{{name}} &nbsp;{{email}} &nbsp;{{service}}</p>' +
    '<label>Body:</label>' +
    '<textarea id="body" placeholder="Hi {{firstName}},\n\nYour message here...\n\n— Jason\nThe Real Help, LLC"></textarea>' +
    '<label style="font-weight:normal;margin-top:12px;"><input type="checkbox" id="previewOnly" checked/> &nbsp;Preview Only — count recipients without sending</label>' +
    '<div><button onclick="send()">🚀 Send Emails</button></div>' +
    '<script>' +
    // Load saved templates into the dropdown on open
    'google.script.run.withSuccessHandler(function(r){' +
    '  var sel=document.getElementById("templatePicker");' +
    '  sel.innerHTML="<option value=\'\'>— Write custom email —</option>";' +
    '  if(r.templates&&r.templates.length){' +
    '    r.templates.forEach(function(t){' +
    '      var opt=document.createElement("option");' +
    '      opt.value=JSON.stringify({subject:t.subject,body:t.body});' +
    '      opt.textContent=t.campaignName;' +
    '      sel.appendChild(opt);' +
    '    });' +
    '  } else {' +
    '    sel.innerHTML="<option value=\'\'>— No saved templates (write custom) —</option>";' +
    '  }' +
    '  sel.onchange=function(){' +
    '    if(!sel.value) return;' +
    '    var tpl=JSON.parse(sel.value);' +
    '    document.getElementById("subject").value=tpl.subject||"",' +
    '    document.getElementById("body").value=tpl.body||"";' +
    '  };' +
    '}).getEmailTemplatesForDialog();' +
    'function send(){' +
    '  var config={' +
    '    campaignName:document.getElementById("campaignName").value,' +
    '    sheetName:"' + sheet.getName() + '",' +
    '    startRow:' + startRow + ',' +
    '    numRows:' + numRows + ',' +
    '    subject:document.getElementById("subject").value,' +
    '    body:document.getElementById("body").value,' +
    '    previewOnly:document.getElementById("previewOnly").checked' +
    '  };' +
    '  if(!config.campaignName){alert("Please enter a campaign name");return;}' +
    '  if(!config.subject||!config.body){alert("Please fill in subject and body");return;}' +
    '  google.script.run' +
    '    .withSuccessHandler(function(r){' +
    '      if(r.preview){alert("PREVIEW\\n\\nWould send to "+r.recipientCount+" recipient(s).\\nUncheck \'Preview Only\' to actually send.");}' +
    '      else{alert("Done!\\nSent: "+r.sentCount+"\\nErrors: "+r.errorCount);}' +
    '      google.script.host.close();' +
    '    })' +
    '    .withFailureHandler(function(err){alert("Error: "+err.message);})' +
    '    .sendToSelectedRows(config);' +
    '}' +
    '</script>'
  ).setWidth(520).setHeight(640);

  SpreadsheetApp.getUi().showModalDialog(html, 'Email Selected Rows');
}

function sendToSelectedRows(config) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(config.sheetName);
  if (!sheet) throw new Error("Sheet not found");

  var logSheet   = ensureBulkEmailLogSheet();
  var campaignId = generateCampaignId();
  var startTime  = new Date();

  var headers    = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var nameCol    = headers.indexOf("Name");
  var emailCol   = headers.indexOf("Email");
  var phoneCol   = headers.indexOf("Phone");
  var serviceCol = headers.indexOf("Service") !== -1 ? headers.indexOf("Service") : headers.indexOf("Service Interested In");

  if (emailCol === -1) throw new Error("Email column not found");

  var selectedData = sheet.getRange(config.startRow, 1, config.numRows, sheet.getLastColumn()).getValues();
  var recipients   = [];
  var seenEmails   = {};

  for (var i = 0; i < selectedData.length; i++) {
    var row   = selectedData[i];
    var email = row[emailCol];
    if (!email || email.toString().trim() === "") continue;
    email = email.toString().trim().toLowerCase();
    if (seenEmails[email]) continue;
    seenEmails[email] = true;
    recipients.push({
      email: email,
      name: nameCol !== -1 ? row[nameCol] : "",
      firstName: nameCol !== -1 && row[nameCol] ? row[nameCol].split(" ")[0] : "",
      phone: phoneCol !== -1 ? row[phoneCol] : "",
      service: serviceCol !== -1 ? row[serviceCol] : ""
    });
  }

  if (recipients.length === 0) return { success: false, message: "No valid emails in selection" };
  if (config.previewOnly) return { success: true, preview: true, recipientCount: recipients.length };

  var sentCount  = 0;
  var errorCount = 0;

  for (var k = 0; k < recipients.length; k++) {
    try {
      sendEmailWithSig(
        recipients[k].email,
        applyMergeFields(config.subject, recipients[k]),
        applyMergeFields(config.body, recipients[k]),
        { name: "Jason — The Real Help, LLC", replyTo: JASON_EMAIL }
      );
      sentCount++;
      if (k < recipients.length - 1) Utilities.sleep(EMAIL_DELAY_MS);
    } catch (err) {
      errorCount++;
    }
  }

  var endTime = new Date();

  logCampaignSummary(logSheet, {
    campaignId: campaignId,
    campaignName: config.campaignName,
    sheetName: config.sheetName,
    filters: "Selected rows " + config.startRow + "-" + (config.startRow + config.numRows - 1),
    totalRecipients: recipients.length,
    sentCount: sentCount,
    errorCount: errorCount,
    startTime: startTime,
    endTime: endTime,
    durationSeconds: (endTime - startTime) / 1000
  });

  return { success: true, sentCount: sentCount, errorCount: errorCount, totalRecipients: recipients.length };
}

// ─── MERGE FIELDS ─────────────────────────────────────────────────────────

function applyMergeFields(text, recipient) {
  if (!text) return "";
  return text
    .replace(/\{\{firstName\}\}/g, recipient.firstName || "there")
    .replace(/\{\{name\}\}/g, recipient.name || "")
    .replace(/\{\{email\}\}/g, recipient.email || "")
    .replace(/\{\{service\}\}/g, recipient.service || "")
    .replace(/\{\{phone\}\}/g, recipient.phone || "");
}

// ─── GMAIL SIGNATURE ─────────────────────────────────────────────────────

var _signatureCache = null;

// Fetches your default Gmail signature.
// Requires: Apps Script editor → ＋ Services → Gmail API (enable it once).
function getMySignature() {
  if (_signatureCache !== null) return _signatureCache;
  try {
    var aliases = Gmail.Users.Settings.SendAs.list('me').sendAs;
    for (var i = 0; i < aliases.length; i++) {
      if (aliases[i].isDefault) {
        _signatureCache = aliases[i].signature || '';
        return _signatureCache;
      }
    }
  } catch (e) {
    // Gmail API not yet enabled — no signature appended
  }
  _signatureCache = '';
  return '';
}

// Use this instead of GmailApp.sendEmail for all client-facing emails.
// Appends your Gmail signature as htmlBody so it renders with logos/links.
function sendEmailWithSig(to, subject, body, opts) {
  opts = opts || {};
  var sig = getMySignature();
  if (sig) {
    opts.htmlBody = body.replace(/\n/g, '<br>') + '<br><br>' + sig;
  }
  GmailApp.sendEmail(to, subject, body, opts);
}

// ─── BULK EMAIL LOG ───────────────────────────────────────────────────────

function ensureBulkEmailLogSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_BULK_LOG);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_BULK_LOG);
    sheet.appendRow([
      "Campaign ID", "Campaign Name", "Start Time", "Sheet Name",
      "Filters", "Total", "Sent", "Errors", "Duration (sec)"
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function logCampaignSummary(sheet, data) {
  sheet.appendRow([
    data.campaignId,
    data.campaignName,
    data.startTime,
    data.sheetName,
    data.filters,
    data.totalRecipients,
    data.sentCount,
    data.errorCount,
    data.durationSeconds
  ]);
}

function generateCampaignId() {
  return "CAMP_" + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
}

// ─── CUSTOM MENU ──────────────────────────────────────────────────────────

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 CRM Actions')
    .addItem('✉️ Email Selected Rows', 'menuSendToSelectedRows')
    .addSeparator()
    .addSubMenu(ui.createMenu('📧 Bulk Email Campaigns')
      .addItem('📝 Create Custom Campaign', 'showCustomCampaignDialog')
      .addSeparator()
      .addItem('📣 Initial Outreach Campaign', 'menuInitialOutreach')
      .addItem('🆕 Email New Leads', 'menuSendToNewLeads')
      .addItem('💼 Email Active Clients', 'menuSendToActiveClients')
      .addItem('💀 Win-Back Dead Leads', 'menuWinBackDeadLeads')
      .addSeparator()
      .addItem('👁️ Preview Campaign', 'menuPreviewCampaign'))
    .addSeparator()
    .addItem('📊 View Bulk Email Log', 'openBulkEmailLog')
    .addItem('⚙️ Run Setup (One-Time)', 'runSetup')
    .addToUi();
}

// ─── CAMPAIGN DIALOGS ─────────────────────────────────────────────────────

function showCustomCampaignDialog() {
  var html = HtmlService.createHtmlOutput(
    '<style>' +
    'body{font-family:Arial,sans-serif;padding:20px;}' +
    'label{display:block;margin-top:15px;font-weight:bold;}' +
    'input,select,textarea{width:100%;padding:8px;margin-top:5px;box-sizing:border-box;}' +
    'textarea{height:200px;font-family:monospace;}' +
    'button{margin-top:20px;padding:10px 20px;background:#1E3A8A;color:white;border:none;cursor:pointer;border-radius:4px;}' +
    'button:hover{background:#163080;}' +
    '.help{font-size:11px;color:#666;font-style:italic;}' +
    '</style>' +
    '<h2>📧 Create Bulk Email Campaign</h2>' +
    '<label>Campaign Name:</label>' +
    '<input type="text" id="campaignName" placeholder="e.g., Q2 Lead Nurture"/>' +
    '<label>Target Sheet:</label>' +
    '<select id="sheetName">' +
    '<option value="Lead Pipeline">Lead Pipeline</option>' +
    '<option value="Active Clients">Active Clients</option>' +
    '<option value="ClosedWon">ClosedWon</option>' +
    '<option value="Dead Leads">Dead Leads</option>' +
    '</select>' +
    '<label>Filter by Status (optional):</label>' +
    '<input type="text" id="status" placeholder="Leave blank to send to everyone"/>' +
    '<label>Email Subject:</label>' +
    '<input type="text" id="subject" placeholder="Use {{firstName}}, {{name}}, {{service}}"/>' +
    '<div class="help">Merge fields: {{firstName}}, {{name}}, {{email}}, {{service}}, {{phone}}</div>' +
    '<label>Email Body:</label>' +
    '<textarea id="body" placeholder="Hi {{firstName}},\n\nYour message here...\n\n— Jason"></textarea>' +
    '<label><input type="checkbox" id="previewOnly" checked/> Preview Only (don\'t send yet)</label>' +
    '<br/>' +
    '<button onclick="saveTpl()">💾 Save as Template</button>&nbsp;' +
    '<button onclick="sendCampaign()">🚀 Send Campaign</button>' +
    '<script>' +
    'function saveTpl(){' +
    '  google.script.run' +
    '    .withSuccessHandler(function(){alert("Template saved!");})' +
    '    .saveEmailTemplate({' +
    '      campaignName:document.getElementById("campaignName").value,' +
    '      targetList:document.getElementById("sheetName").value,' +
    '      subject:document.getElementById("subject").value,' +
    '      body:document.getElementById("body").value' +
    '    });' +
    '}' +
    'function sendCampaign(){' +
    '  var config={' +
    '    campaignName:document.getElementById("campaignName").value,' +
    '    sheetName:document.getElementById("sheetName").value,' +
    '    subject:document.getElementById("subject").value,' +
    '    body:document.getElementById("body").value,' +
    '    previewOnly:document.getElementById("previewOnly").checked,' +
    '    filters:{}' +
    '  };' +
    '  var s=document.getElementById("status").value.trim();' +
    '  if(s) config.filters.status=s;' +
    '  if(!config.campaignName){alert("Please enter a campaign name");return;}' +
    '  if(!config.subject||!config.body){alert("Please fill in subject and body");return;}' +
    '  google.script.run' +
    '    .withSuccessHandler(function(r){' +
    '      if(r.preview){alert("PREVIEW\\n\\nWould send to "+r.recipientCount+" recipients.\\nUncheck Preview Only to send.");}' +
    '      else{alert("Sent: "+r.sentCount+"\\nErrors: "+r.errorCount);}' +
    '      google.script.host.close();' +
    '    })' +
    '    .withFailureHandler(function(err){alert("Error: "+err.message);})' +
    '    .sendBulkEmail(config);' +
    '}' +
    '</script>'
  ).setWidth(500).setHeight(700);

  SpreadsheetApp.getUi().showModalDialog(html, 'Bulk Email Campaign');
}

// ─── MENU CAMPAIGN FUNCTIONS ──────────────────────────────────────────────

function menuInitialOutreach() {
  var ui = SpreadsheetApp.getUi();
  var r  = ui.alert('Send Initial Outreach?', 'Sends your introduction email to everyone in Lead Pipeline.\n\nContinue?', ui.ButtonSet.YES_NO);
  if (r == ui.Button.YES) {
    var result = sendBulkEmail({
      sheetName: "Lead Pipeline",
      subject: "Most business owners are getting overcharged. Let me fix that.",
      body: [
        "Real talk —",
        "",
        "Go here now: https://www.therealhelp.com",
        "",
        "Most small business owners I meet are either paying too much for help they're not getting, or they stopped asking for help altogether because they figured they couldn't afford it. You might even go into a center that gives only surface level help.",
        "",
        "Both of those situations cost you time, money, and more than you think.",
        "",
        "My name is Jason Griffin. I started The Real Help, LLC for one reason — to be the person I wish existed when I was figuring this out.",
        "",
        "Trust me. You can afford me. Here's what I actually do:",
        "",
        "→ Build you real systems so you stop running your business out of your head",
        "→ Automate the stuff eating your time so you can focus on growth",
        "→ Build custom apps and tech that actually fit your business",
        "→ Get your business MBE/WBE certified so you can compete for contracts",
        "→ Help CDS and Medicaid agencies get compliant and stay that way",
        "→ Brand your business so it looks as serious as it is",
        "→ Figure out your finances",
        "",
        "No big agency. No junior staff. No runaround.",
        "",
        "Just me — working directly with you — at a price built for real businesses.",
        "",
        "First conversation is free. No pitch. Just a real talk about where you are and what you need.",
        "",
        "See what I'm about: https://www.therealhelp.com",
        "",
        "When you're ready — I'm here.",
        "",
        "Jason Griffin",
        "The Real Help, LLC",
        "jason@therealhelp.com"
      ].join("\n"),
      filters: {},
      previewOnly: false,
      campaignName: "Initial Business Outreach"
    });
    ui.alert('Done', 'Sent: ' + result.sentCount + '\nErrors: ' + result.errorCount, ui.ButtonSet.OK);
  }
}

function menuSendToNewLeads() {
  var ui = SpreadsheetApp.getUi();
  var r  = ui.alert('Send to New Leads?', 'Sends to all leads with status "New" in Lead Pipeline.\n\nContinue?', ui.ButtonSet.YES_NO);
  if (r == ui.Button.YES) {
    var result = sendBulkEmail({
      sheetName: "Lead Pipeline",
      subject: "Still thinking about it, {{firstName}}? Let's just talk.",
      body: [
        "Hey {{firstName}},",
        "",
        "You reached out a little while back about {{service}} — and I just want to make sure I didn't drop the ball on you.",
        "",
        "I know life gets busy. Things get pushed to the back burner. That's real.",
        "",
        "But whatever brought you to The Real Help in the first place — that problem didn't go away.",
        "",
        "If you're still thinking about it, let's just get on a call. Free. No pitch.",
        "",
        BOOKING_URL,
        "",
        "And if the timing still isn't right — no hard feelings. I'll be here when it is.",
        "",
        "Jason Griffin",
        "The Real Help, LLC"
      ].join("\n"),
      filters: { status: "New" },
      previewOnly: false,
      campaignName: "New Lead Re-Engagement"
    });
    ui.alert('Done', 'Sent: ' + result.sentCount + '\nErrors: ' + result.errorCount, ui.ButtonSet.OK);
  }
}

function menuSendToActiveClients() {
  var ui = SpreadsheetApp.getUi();
  var r  = ui.alert('Send to Active Clients?', 'Sends a check-in email to all contacts in Active Clients tab.\n\nContinue?', ui.ButtonSet.YES_NO);
  if (r == ui.Button.YES) {
    var result = sendBulkEmail({
      sheetName: "Active Clients",
      subject: "Checking in on you, {{firstName}}",
      body: [
        "Hey {{firstName}},",
        "",
        "Just wanted to check in on your {{service}} project.",
        "",
        "Everything is moving in the right direction on my end. But I always want to make sure you feel informed and in the loop — not just waiting on a result.",
        "",
        "If anything has changed or you have questions — just reply or grab time:",
        BOOKING_URL,
        "",
        "Appreciate you trusting me with this.",
        "",
        "Jason Griffin",
        "The Real Help, LLC"
      ].join("\n"),
      filters: {},
      previewOnly: false,
      campaignName: "Active Client Check-In"
    });
    ui.alert('Done', 'Sent: ' + result.sentCount + '\nErrors: ' + result.errorCount, ui.ButtonSet.OK);
  }
}

function menuWinBackDeadLeads() {
  var ui = SpreadsheetApp.getUi();
  var r  = ui.alert('Win-Back Campaign?', 'Sends re-engagement email to Dead Leads tab.\n\nContinue?', ui.ButtonSet.YES_NO);
  if (r == ui.Button.YES) {
    var result = sendBulkEmail({
      sheetName: "Dead Leads",
      subject: "{{firstName}}, still here if you need help",
      body: [
        "Hey {{firstName}},",
        "",
        "I know we talked a while back about {{service}} and the timing wasn't right.",
        "",
        "Things change — if you're ready now, I'm here.",
        "",
        "No pressure. Just wanted to leave the door open:",
        BOOKING_URL,
        "",
        "Jason Griffin",
        "The Real Help, LLC"
      ].join("\n"),
      filters: {},
      previewOnly: false,
      campaignName: "Dead Lead Win-Back"
    });
    ui.alert('Done', 'Sent: ' + result.sentCount + '\nErrors: ' + result.errorCount, ui.ButtonSet.OK);
  }
}

function menuPreviewCampaign() {
  var result = sendBulkEmail({
    sheetName: "Lead Pipeline",
    subject: "Test email for {{firstName}}",
    body: "Hi {{firstName}},\n\nThis is a test email.\n\n— Jason",
    filters: {},
    previewOnly: true,
    campaignName: "Test Preview"
  });
  SpreadsheetApp.getUi().alert('Preview', 'Would send to ' + result.recipientCount + ' recipients.', SpreadsheetApp.getUi().ButtonSet.OK);
}

function openBulkEmailLog() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_BULK_LOG) || ensureBulkEmailLogSheet();
  ss.setActiveSheet(sheet);
}

// ─── ONE-TIME SETUP ───────────────────────────────────────────────────────

function runSetup() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "processFollowUps") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("processFollowUps")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();

  ensureBulkEmailLogSheet();

  SpreadsheetApp.getUi().alert(
    'Setup Complete!',
    'Daily follow-up trigger created (runs at 9 AM).\nBulk Email Log sheet initialized.\n\nYou\'re all set!',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// ─── PROPERTY TRANSFER HANDLER ────────────────────────────────────────────

function handlePropertyTransfer(data) {
  var clientName  = data.clientName  || "Unknown";
  var clientEmail = data.clientEmail || "";
  var clientPhone = data.clientPhone || "";
  var properties  = data.properties  || [];
  var transferId  = data.transferId  || "";

  // Build property detail block for the notification email
  var propLines = [];
  for (var i = 0; i < properties.length; i++) {
    var p = properties[i];
    propLines.push("  Property " + (i + 1) + ":");
    if (p.address)           propLines.push("    Address:         " + p.address);
    if (p.parcelNumber)      propLines.push("    Parcel #:        " + p.parcelNumber);
    if (p.jurisdiction)      propLines.push("    Jurisdiction:    " + p.jurisdiction);
    if (p.grantor)           propLines.push("    Grantor:         " + p.grantor);
    if (p.grantee)           propLines.push("    Grantee:         " + p.grantee);
    if (p.consideration)     propLines.push("    Consideration:   " + p.consideration);
    if (p.legalDescription)  propLines.push("    Legal Desc:      " + p.legalDescription);
    propLines.push("");
  }

  // Notification to Jason
  var subject = "New Property Transfer Request — " + clientName + " (" + properties.length + " propert" + (properties.length === 1 ? "y" : "ies") + ")";

  var body = [
    "New property transfer intake form submission.",
    "",
    "Client:  " + clientName,
    "Email:   " + clientEmail,
    "Phone:   " + clientPhone,
    "Properties Submitted: " + properties.length,
    ""
  ].concat(propLines).concat([
    "──────────────────────────",
    "View in Admin: https://therealhelp.com/admin/property-transfers",
    "Transfer ID: " + transferId
  ]).join("\n");

  GmailApp.sendEmail(JASON_EMAIL, subject, body);

  // Auto-reply to client
  if (clientEmail) {
    var firstName = clientName.split(" ")[0] || "there";

    var replyBody = [
      "Hi " + firstName + ",",
      "",
      "I received your property transfer request for " + properties.length + " propert" + (properties.length === 1 ? "y" : "ies") + ".",
      "",
      "I'll review the details and send you a quote within 4 business hours. If you have any questions in the meantime, just reply to this email.",
      "",
      "— Jason",
      "The Real Help, LLC",
      "therealhelp.com"
    ].join("\n");

    sendEmailWithSig(clientEmail, "Got your property transfer request — The Real Help, LLC", replyBody, {
      name: "Jason — The Real Help, LLC",
      replyTo: JASON_EMAIL
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}