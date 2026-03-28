/**
 * THE REAL HELP, LLC — Google Apps Script CRM Automation
 * ENHANCED WITH BULK EMAIL FUNCTIONALITY
 *
 * SETUP INSTRUCTIONS
 * ------------------
 * 1. Open your Google Sheet (create one if needed).
 * 2. Click Extensions > Apps Script.
 * 3. Paste this entire file, replacing all default content.
 * 4. Click Save (Ctrl+S).
 * 5. Create these tabs in your Sheet: "Lead Pipeline", "FollowUp Queue", 
 *    "Active Clients", "ClosedWon", "Dead Leads", "Bulk Email Log"
 * 6. In Apps Script: Run > runSetup ONCE to create time-based trigger for follow-ups.
 * 7. Deploy as Web App:
 *    - Click Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy and copy the URL
 * 8. Paste that URL into your Firebase Functions environment:
 *    - Add this line to functions/.env:
 *      APPS_SCRIPT_WEBHOOK_URL=<your deployed URL>
 *    - For production, set in Firebase Console: Functions > Config
 *
 * SHEET TABS EXPECTED
 * -------------------
 * "Lead Pipeline" — one row per lead (headers auto-created on first write)
 * "FollowUp Queue" — pending/sent follow-up emails
 * "Active Clients" — clients currently being worked with
 * "ClosedWon" — successfully closed deals
 * "Dead Leads" — leads that didn't convert
 * "Bulk Email Log" — tracks all bulk email campaigns
 *
 * NEW BULK EMAIL FEATURES
 * ------------------------
 * - Send bulk emails to filtered segments (by tab, status, service, etc.)
 * - Personalized merge fields (firstName, name, email, service, etc.)
 * - Rate limiting (1 email per second to avoid Gmail quota issues)
 * - Campaign tracking and logging
 * - Preview mode to test before sending
 * - Duplicate email detection
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────

var JASON_EMAIL = "info@therealhelp.com";
var BOOKING_URL = "https://calendar.app.google/ubdfXKUbazhjgs2VA";
var SHEET_NAME_LEADS = "Lead Pipeline";
var SHEET_NAME_FOLLOWUPS = "FollowUp Queue";
var SHEET_NAME_ACTIVE = "Active Clients";
var SHEET_NAME_CLOSEDWON = "ClosedWon";
var SHEET_NAME_DEAD = "Dead Leads";
var SHEET_NAME_BULK_LOG = "Bulk Email Log";

// Gmail daily quota: 100 (free) or 1500 (Workspace)
var MAX_EMAILS_PER_BATCH = 100;
var EMAIL_DELAY_MS = 1000; // 1 second between emails

// ─── ENTRY POINT ───────────────────────────────────────────────────────────

/**
 * Receives POST from Firebase Cloud Function.
 * Body: { name, email, phone, service, message, leadId, createdAt }
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    addLeadToSheet(data);
    sendNotificationEmail(data);
    sendAutoReply(data);
    scheduleFollowUps(data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log("doPost error: " + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── LEAD SHEET ────────────────────────────────────────────────────────────

function addLeadToSheet(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_LEADS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_LEADS);
  }

  // Write headers if sheet is empty
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
    "View in Google Sheets: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ""
  ].join("\n");

  GmailApp.sendEmail(JASON_EMAIL, subject, body);
}

// ─── AUTO-REPLY (to lead) ───────────────────────────────────────────────────

function sendAutoReply(data) {
  if (!data.email) return;

  var firstName = (data.name || "").split(" ")[0] || "there";

  var subject = "Got your message — The Real Help, LLC";

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
    "(314) 660-2890",
    "therealhelp.com"
  ].join("\n");

  GmailApp.sendEmail(data.email, subject, body, {
    name: "Jason — The Real Help, LLC",
    replyTo: JASON_EMAIL
  });
}

// ─── SCHEDULE FOLLOW-UPS ───────────────────────────────────────────────────

function scheduleFollowUps(data) {
  if (!data.email) return;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_FOLLOWUPS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_FOLLOWUPS);
  }

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

// ─── DAILY FOLLOW-UP PROCESSOR ─────────────────────────────────────────────

/**
 * Run this on a daily time-based trigger (set up via runSetup below).
 * Checks the FollowUp Queue tab and sends any emails due today.
 */
function processFollowUps() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_FOLLOWUPS);
  if (!sheet || sheet.getLastRow() <= 1) return;

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var data = sheet.getDataRange().getValues();
  // Row 0 = headers, skip it
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var scheduledDate = new Date(row[0]);
    scheduledDate.setHours(0, 0, 0, 0);
    var name    = row[1];
    var email   = row[2];
    var service = row[3];
    var type    = row[4]; // "Day2" or "Day5"
    var status  = row[5];

    if (status !== "Pending") continue;
    if (scheduledDate > today) continue;

    try {
      if (type === "Day2") {
        sendDay2FollowUp(name, email, service);
      } else if (type === "Day5") {
        sendDay5FollowUp(name, email, service);
      }
      // Mark as Sent
      sheet.getRange(i + 1, 6).setValue("Sent");
    } catch (err) {
      Logger.log("Follow-up error for " + email + ": " + err.message);
      sheet.getRange(i + 1, 6).setValue("Error: " + err.message);
    }
  }
}

// ─── FOLLOW-UP EMAILS ──────────────────────────────────────────────────────

function sendDay2FollowUp(name, email, service) {
  var firstName = (name || "").split(" ")[0] || "there";
  var subject = "Just checking in — The Real Help";

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
    "The Real Help, LLC",
    "(314) 660-2890"
  ].join("\n");

  GmailApp.sendEmail(email, subject, body, {
    name: "Jason — The Real Help, LLC",
    replyTo: JASON_EMAIL
  });
}

function sendDay5FollowUp(name, email, service) {
  var firstName = (name || "").split(" ")[0] || "there";
  var subject = "Leaving the door open — The Real Help";

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
    "The Real Help, LLC",
    "(314) 660-2890"
  ].join("\n");

  GmailApp.sendEmail(email, subject, body, {
    name: "Jason — The Real Help, LLC",
    replyTo: JASON_EMAIL
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── BULK EMAIL FUNCTIONALITY ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Send bulk email to a filtered segment of contacts
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.sheetName - Sheet to pull contacts from (e.g., "Lead Pipeline", "Active Clients")
 * @param {string} config.subject - Email subject line (supports merge fields)
 * @param {string} config.body - Email body (supports merge fields)
 * @param {Object} config.filters - Optional filters { status: "New", service: "App Development" }
 * @param {boolean} config.previewOnly - If true, only show preview without sending
 * @param {string} config.campaignName - Name for this campaign (for logging)
 * 
 * Merge fields supported: {{firstName}}, {{name}}, {{email}}, {{service}}, {{phone}}
 * 
 * Example usage:
 * sendBulkEmail({
 *   sheetName: "Lead Pipeline",
 *   subject: "Hi {{firstName}}, special offer for {{service}}",
 *   body: "Dear {{name}},\n\nWe noticed you were interested in {{service}}...",
 *   filters: { status: "New" },
 *   previewOnly: false,
 *   campaignName: "Q1 Lead Nurture"
 * });
 */
function sendBulkEmail(config) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(config.sheetName);
  
  if (!sheet) {
    throw new Error("Sheet '" + config.sheetName + "' not found");
  }

  // Initialize bulk email log
  var logSheet = ensureBulkEmailLogSheet();
  
  var campaignId = generateCampaignId();
  var startTime = new Date();
  
  // Get all data from the sheet
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    Logger.log("No data found in " + config.sheetName);
    return { success: false, message: "No data in sheet" };
  }

  // Parse headers
  var headers = data[0];
  var nameCol = headers.indexOf("Name");
  var emailCol = headers.indexOf("Email");
  var phoneCol = headers.indexOf("Phone");
  var serviceCol = headers.indexOf("Service") !== -1 ? headers.indexOf("Service") : headers.indexOf("Service Interested In");
  var statusCol = headers.indexOf("Status");

  if (emailCol === -1) {
    throw new Error("Email column not found in sheet");
  }

  // Filter contacts based on criteria
  var recipients = [];
  var seenEmails = {}; // Deduplicate emails
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var email = row[emailCol];
    var name = nameCol !== -1 ? row[nameCol] : "";
    var phone = phoneCol !== -1 ? row[phoneCol] : "";
    var service = serviceCol !== -1 ? row[serviceCol] : "";
    var status = statusCol !== -1 ? row[statusCol] : "";

    // Skip if no email
    if (!email || email.toString().trim() === "") continue;
    
    email = email.toString().trim().toLowerCase();
    
    // Skip duplicates
    if (seenEmails[email]) continue;
    
    // Apply filters if provided
    if (config.filters) {
      var passesFilter = true;
      
      if (config.filters.status && status !== config.filters.status) {
        passesFilter = false;
      }
      
      if (config.filters.service && service !== config.filters.service) {
        passesFilter = false;
      }
      
      if (config.filters.statusContains && status.indexOf(config.filters.statusContains) === -1) {
        passesFilter = false;
      }
      
      if (!passesFilter) continue;
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

  if (recipients.length === 0) {
    Logger.log("No recipients match the filter criteria");
    return { success: false, message: "No recipients match filters" };
  }

  // Check quota
  if (recipients.length > MAX_EMAILS_PER_BATCH) {
    throw new Error("Recipient count (" + recipients.length + ") exceeds max batch size (" + MAX_EMAILS_PER_BATCH + ")");
  }

  // Preview mode - just log what would be sent
  if (config.previewOnly) {
    Logger.log("PREVIEW MODE - Would send to " + recipients.length + " recipients:");
    for (var j = 0; j < Math.min(5, recipients.length); j++) {
      var preview = recipients[j];
      var previewSubject = applyMergeFields(config.subject, preview);
      var previewBody = applyMergeFields(config.body, preview);
      Logger.log("───────────────────────────");
      Logger.log("To: " + preview.email + " (" + preview.name + ")");
      Logger.log("Subject: " + previewSubject);
      Logger.log("Body:\n" + previewBody);
    }
    Logger.log("───────────────────────────");
    Logger.log("Total recipients: " + recipients.length);
    return {
      success: true,
      preview: true,
      recipientCount: recipients.length,
      sampleRecipients: recipients.slice(0, 5)
    };
  }

  // Send emails
  var sentCount = 0;
  var errorCount = 0;
  var errors = [];

  for (var k = 0; k < recipients.length; k++) {
    var recipient = recipients[k];
    
    try {
      var personalizedSubject = applyMergeFields(config.subject, recipient);
      var personalizedBody = applyMergeFields(config.body, recipient);
      
      GmailApp.sendEmail(recipient.email, personalizedSubject, personalizedBody, {
        name: "Jason — The Real Help, LLC",
        replyTo: JASON_EMAIL
      });
      
      sentCount++;
      
      // Log individual email
      logBulkEmail(logSheet, {
        campaignId: campaignId,
        campaignName: config.campaignName || "Unnamed Campaign",
        timestamp: new Date(),
        recipientEmail: recipient.email,
        recipientName: recipient.name,
        subject: personalizedSubject,
        status: "Sent"
      });
      
      // Rate limiting - wait 1 second between emails
      if (k < recipients.length - 1) {
        Utilities.sleep(EMAIL_DELAY_MS);
      }
      
    } catch (err) {
      errorCount++;
      errors.push({ email: recipient.email, error: err.message });
      
      logBulkEmail(logSheet, {
        campaignId: campaignId,
        campaignName: config.campaignName || "Unnamed Campaign",
        timestamp: new Date(),
        recipientEmail: recipient.email,
        recipientName: recipient.name,
        subject: config.subject,
        status: "Error: " + err.message
      });
      
      Logger.log("Error sending to " + recipient.email + ": " + err.message);
    }
  }

  var endTime = new Date();
  var duration = (endTime - startTime) / 1000; // seconds

  // Log campaign summary
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
    durationSeconds: duration
  });

  Logger.log("Bulk email complete: " + sentCount + " sent, " + errorCount + " errors");
  
  return {
    success: true,
    campaignId: campaignId,
    sentCount: sentCount,
    errorCount: errorCount,
    totalRecipients: recipients.length,
    errors: errors,
    durationSeconds: duration
  };
}

/**
 * Apply merge fields to subject or body
 */
function applyMergeFields(text, recipient) {
  if (!text) return "";
  
  var result = text;
  result = result.replace(/\{\{firstName\}\}/g, recipient.firstName || "there");
  result = result.replace(/\{\{name\}\}/g, recipient.name || "");
  result = result.replace(/\{\{email\}\}/g, recipient.email || "");
  result = result.replace(/\{\{service\}\}/g, recipient.service || "");
  result = result.replace(/\{\{phone\}\}/g, recipient.phone || "");
  
  return result;
}

/**
 * Ensure bulk email log sheet exists
 */
function ensureBulkEmailLogSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_BULK_LOG);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_BULK_LOG);
    sheet.appendRow([
      "Campaign ID",
      "Campaign Name", 
      "Timestamp",
      "Sheet Name",
      "Filters",
      "Total Recipients",
      "Sent",
      "Errors",
      "Duration (sec)",
      "Type"
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Log individual email send
 */
function logBulkEmail(sheet, data) {
  // This logs to a separate section or you can create another tab
  // For simplicity, we'll just use Logger for individual sends
  // and only log summaries to the sheet
}

/**
 * Log campaign summary
 */
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
    data.durationSeconds,
    "Summary"
  ]);
}

/**
 * Generate unique campaign ID
 */
function generateCampaignId() {
  return "CAMP_" + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
}

// ─── EXAMPLE BULK EMAIL CAMPAIGNS ──────────────────────────────────────────

/**
 * Example: Send to all new leads
 */
function exampleSendToNewLeads() {
  return sendBulkEmail({
    sheetName: "Lead Pipeline",
    subject: "Hi {{firstName}}, following up on your interest in {{service}}",
    body: [
      "Hi {{firstName}},",
      "",
      "I wanted to reach out about your recent inquiry regarding {{service}}.",
      "",
      "I'd love to hop on a quick call to understand exactly what you're looking for.",
      "",
      "Book a time that works for you:",
      BOOKING_URL,
      "",
      "Looking forward to connecting,",
      "",
      "— Jason",
      "The Real Help, LLC",
      "(314) 660-2890"
    ].join("\n"),
    filters: { status: "New" },
    previewOnly: false,
    campaignName: "New Lead Outreach"
  });
}

/**
 * Example: Preview email to active clients
 */
function examplePreviewActiveClients() {
  return sendBulkEmail({
    sheetName: "Active Clients",
    subject: "Quick update for {{firstName}}",
    body: [
      "Hi {{firstName}},",
      "",
      "Just wanted to send a quick update on your project.",
      "",
      "Let me know if you have any questions!",
      "",
      "— Jason"
    ].join("\n"),
    filters: {},
    previewOnly: true,
    campaignName: "Client Update"
  });
}

/**
 * Example: Win-back campaign for dead leads
 */
function exampleWinBackCampaign() {
  return sendBulkEmail({
    sheetName: "Dead Leads",
    subject: "{{firstName}}, still here if you need help",
    body: [
      "Hi {{firstName}},",
      "",
      "I know we talked a while back about {{service}}, and the timing wasn't right.",
      "",
      "Things change — if you're ready now, I'm here to help.",
      "",
      "No pressure at all. Just wanted to leave the door open:",
      BOOKING_URL,
      "",
      "Best,",
      "",
      "— Jason",
      "The Real Help, LLC"
    ].join("\n"),
    filters: {},
    previewOnly: false,
    campaignName: "Dead Lead Win-Back"
  });
}

// ─── CUSTOM MENU ───────────────────────────────────────────────────────────

/**
 * Creates custom menu in Google Sheets when the spreadsheet opens
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 CRM Actions')
    .addSubMenu(ui.createMenu('📧 Bulk Email Campaigns')
      .addItem('✅ Send to Selected Rows', 'menuSendToSelectedRows')
      .addSeparator()
      .addItem('📝 Create Custom Campaign...', 'showCustomCampaignDialog')
      .addSeparator()
      .addItem('🆕 Email New Leads', 'menuSendToNewLeads')
      .addItem('💼 Email Active Clients', 'menuSendToActiveClients')
      .addItem('💀 Win-Back Dead Leads', 'menuWinBackDeadLeads')
      .addSeparator()
      .addItem('👁️ Preview Campaign (Test)', 'menuPreviewCampaign'))
    .addSeparator()
    .addItem('📊 View Bulk Email Log', 'openBulkEmailLog')
    .addItem('⚙️ Run Setup (One-Time)', 'runSetup')
    .addToUi();
}

/**
 * Show custom campaign dialog
 */
function showCustomCampaignDialog() {
  var html = HtmlService.createHtmlOutput(
    '<style>' +
    'body { font-family: Arial, sans-serif; padding: 20px; }' +
    'label { display: block; margin-top: 15px; font-weight: bold; }' +
    'input, select, textarea { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }' +
    'textarea { height: 200px; font-family: monospace; }' +
    'button { margin-top: 20px; padding: 10px 20px; background: #4285f4; color: white; border: none; cursor: pointer; }' +
    'button:hover { background: #3367d6; }' +
    '.help { font-size: 11px; color: #666; font-style: italic; }' +
    '</style>' +
    
    '<h2>📧 Create Bulk Email Campaign</h2>' +
    
    '<label>Campaign Name:</label>' +
    '<input type="text" id="campaignName" placeholder="e.g., Q2 Lead Nurture" />' +
    
    '<label>Target Sheet:</label>' +
    '<select id="sheetName">' +
    '<option value="Lead Pipeline">Lead Pipeline</option>' +
    '<option value="Active Clients">Active Clients</option>' +
    '<option value="ClosedWon">ClosedWon</option>' +
    '<option value="Dead Leads">Dead Leads</option>' +
    '</select>' +
    
    '<label>Filter by Status (optional):</label>' +
    '<input type="text" id="status" placeholder="e.g., New (leave blank for all)" />' +
    '<div class="help">Leave blank to send to everyone in the sheet</div>' +
    
    '<label>Email Subject:</label>' +
    '<input type="text" id="subject" placeholder="Use {{firstName}}, {{name}}, {{service}}" />' +
    '<div class="help">Merge fields: {{firstName}}, {{name}}, {{email}}, {{service}}, {{phone}}</div>' +
    
    '<label>Email Body:</label>' +
    '<textarea id="body" placeholder="Hi {{firstName}},\n\nYour message here...\n\n— Jason"></textarea>' +
    
    '<label>' +
    '<input type="checkbox" id="previewOnly" checked /> Preview Only (don&apos;t send yet)' +
    '</label>' +
    
    '<button onclick="sendCampaign()">Send Campaign</button>' +
    
    '<script>' +
    'function sendCampaign() {' +
    '  var config = {' +
    '    campaignName: document.getElementById("campaignName").value,' +
    '    sheetName: document.getElementById("sheetName").value,' +
    '    subject: document.getElementById("subject").value,' +
    '    body: document.getElementById("body").value,' +
    '    previewOnly: document.getElementById("previewOnly").checked,' +
    '    filters: {}' +
    '  };' +
    '  ' +
    '  var status = document.getElementById("status").value.trim();' +
    '  if (status) config.filters.status = status;' +
    '  ' +
    '  if (!config.campaignName) {' +
    '    alert("Please enter a campaign name");' +
    '    return;' +
    '  }' +
    '  if (!config.subject || !config.body) {' +
    '    alert("Please fill in subject and body");' +
    '    return;' +
    '  }' +
    '  ' +
    '  google.script.run' +
    '    .withSuccessHandler(function(result) {' +
    '      if (result.preview) {' +
    '        alert("PREVIEW MODE\\n\\nWould send to " + result.recipientCount + " recipients.\\n\\nCheck the execution log in Apps Script for details.\\n\\nUncheck \'Preview Only\' to actually send.");' +
    '      } else {' +
    '        alert("Campaign sent!\\n\\nSent: " + result.sentCount + "\\nErrors: " + result.errorCount + "\\n\\nCheck Bulk Email Log tab for details.");' +
    '      }' +
    '      google.script.host.close();' +
    '    })' +
    '    .withFailureHandler(function(error) {' +
    '      alert("Error: " + error.message);' +
    '    })' +
    '    .sendBulkEmail(config);' +
    '}' +
    '</script>'
  )
    .setWidth(500)
    .setHeight(650);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Bulk Email Campaign');
}

/**
 * Menu item: Send to new leads
 */
function menuSendToNewLeads() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    'Send to New Leads?',
    'This will send a follow-up email to all leads with status "New" in the Lead Pipeline tab.\n\nContinue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response == ui.Button.YES) {
    var result = exampleSendToNewLeads();
    ui.alert('Campaign Complete', 
             'Sent: ' + result.sentCount + '\nErrors: ' + result.errorCount + '\n\nCheck the Bulk Email Log tab for details.',
             ui.ButtonSet.OK);
  }
}

/**
 * Menu item: Send to active clients
 */
function menuSendToActiveClients() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    'Send to Active Clients?',
    'This will send an update email to all contacts in the Active Clients tab.\n\nContinue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response == ui.Button.YES) {
    var result = sendBulkEmail({
      sheetName: "Active Clients",
      subject: "Quick update for {{firstName}}",
      body: [
        "Hi {{firstName}},",
        "",
        "Just wanted to send a quick update on your project.",
        "",
        "Everything is moving along smoothly. Let me know if you have any questions!",
        "",
        "— Jason",
        "The Real Help, LLC"
      ].join("\n"),
      filters: {},
      previewOnly: false,
      campaignName: "Active Client Update - " + new Date().toLocaleDateString()
    });
    
    ui.alert('Campaign Complete', 
             'Sent: ' + result.sentCount + '\nErrors: ' + result.errorCount,
             ui.ButtonSet.OK);
  }
}

/**
 * Menu item: Win-back dead leads
 */
function menuWinBackDeadLeads() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    'Win-Back Campaign?',
    'This will send a re-engagement email to all contacts in the Dead Leads tab.\n\nContinue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response == ui.Button.YES) {
    var result = exampleWinBackCampaign();
    ui.alert('Campaign Complete', 
             'Sent: ' + result.sentCount + '\nErrors: ' + result.errorCount,
             ui.ButtonSet.OK);
  }
}

/**
 * Menu item: Preview campaign
 */
function menuPreviewCampaign() {
  var ui = SpreadsheetApp.getUi();
  var result = sendBulkEmail({
    sheetName: "Lead Pipeline",
    subject: "Test email for {{firstName}}",
    body: "Hi {{firstName}},\n\nThis is a test email.\n\n— Jason",
    filters: {},
    previewOnly: true,
    campaignName: "Test Preview"
  });
  
  ui.alert('Preview Mode', 
           'Would send to ' + result.recipientCount + ' recipients.\n\nCheck the execution log in Apps Script (View > Logs) to see the first 5 sample emails.',
           ui.ButtonSet.OK);
}

/**
 * Menu item: Open bulk email log
 */
function openBulkEmailLog() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_BULK_LOG);
  
  if (!sheet) {
    sheet = ensureBulkEmailLogSheet();
  }
  
  ss.setActiveSheet(sheet);
}

/**
 * Menu item: Send to selected rows
 */
function menuSendToSelectedRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var selection = sheet.getActiveRange();
  
  if (!selection) {
    SpreadsheetApp.getUi().alert('No Selection', 'Please select one or more rows first.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  // Get selected row numbers
  var startRow = selection.getRow();
  var numRows = selection.getNumRows();
  
  if (startRow === 1) {
    SpreadsheetApp.getUi().alert('Invalid Selection', 'Please don\'t select the header row. Select data rows only.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  // Show dialog to compose email
  showSelectedRowsDialog(sheet.getName(), startRow, numRows);
}

/**
 * Show dialog for sending to selected rows
 */
function showSelectedRowsDialog(sheetName, startRow, numRows) {
  var html = HtmlService.createHtmlOutput(
    '<style>' +
    'body { font-family: Arial, sans-serif; padding: 20px; }' +
    'label { display: block; margin-top: 15px; font-weight: bold; }' +
    'input, textarea { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }' +
    'textarea { height: 200px; font-family: monospace; }' +
    'button { margin-top: 20px; padding: 10px 20px; background: #4285f4; color: white; border: none; cursor: pointer; }' +
    'button:hover { background: #3367d6; }' +
    '.help { font-size: 11px; color: #666; font-style: italic; }' +
    '.info { background: #e8f0fe; padding: 10px; border-radius: 4px; margin-bottom: 15px; }' +
    '</style>' +
    
    '<h2>📧 Send to Selected Rows</h2>' +
    
    '<div class="info">' +
    '📊 Sheet: <strong>' + sheetName + '</strong><br>' +
    '📍 Rows: <strong>' + startRow + ' to ' + (startRow + numRows - 1) + '</strong> (' + numRows + ' row' + (numRows > 1 ? 's' : '') + ')' +
    '</div>' +
    
    '<label>Campaign Name:</label>' +
    '<input type="text" id="campaignName" placeholder="e.g., Selected Leads Follow-Up" />' +
    
    '<label>Email Subject:</label>' +
    '<input type="text" id="subject" placeholder="Use {{firstName}}, {{name}}, {{service}}" />' +
    '<div class="help">Merge fields: {{firstName}}, {{name}}, {{email}}, {{service}}, {{phone}}</div>' +
    
    '<label>Email Body:</label>' +
    '<textarea id="body" placeholder="Hi {{firstName}},\n\nYour message here...\n\n— Jason"></textarea>' +
    
    '<label>' +
    '<input type="checkbox" id="previewOnly" checked /> Preview Only (don&apos;t send yet)' +
    '</label>' +
    
    '<button onclick="sendToSelection()">Send to Selected</button>' +
    
    '<script>' +
    'function sendToSelection() {' +
    '  var config = {' +
    '    campaignName: document.getElementById("campaignName").value,' +
    '    subject: document.getElementById("subject").value,' +
    '    body: document.getElementById("body").value,' +
    '    previewOnly: document.getElementById("previewOnly").checked,' +
    '    sheetName: "' + sheetName + '",' +
    '    startRow: ' + startRow + ',' +
    '    numRows: ' + numRows +
    '  };' +
    '  ' +
    '  if (!config.campaignName) {' +
    '    alert("Please enter a campaign name");' +
    '    return;' +
    '  }' +
    '  if (!config.subject || !config.body) {' +
    '    alert("Please fill in subject and body");' +
    '    return;' +
    '  }' +
    '  ' +
    '  google.script.run' +
    '    .withSuccessHandler(function(result) {' +
    '      if (result.preview) {' +
    '        alert("PREVIEW MODE\\n\\nWould send to " + result.recipientCount + " recipients.\\n\\nCheck the execution log in Apps Script for details.\\n\\nUncheck \'Preview Only\' to actually send.");' +
    '      } else {' +
    '        alert("Campaign sent!\\n\\nSent: " + result.sentCount + "\\nErrors: " + result.errorCount + "\\n\\nCheck Bulk Email Log tab for details.");' +
    '      }' +
    '      google.script.host.close();' +
    '    })' +
    '    .withFailureHandler(function(error) {' +
    '      alert("Error: " + error.message);' +
    '    })' +
    '    .sendToSelectedRows(config);' +
    '}' +
    '</script>'
  )
    .setWidth(500)
    .setHeight(600);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Send to Selected Rows');
}

/**
 * Send emails to selected rows only
 */
function sendToSelectedRows(config) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(config.sheetName);
  
  if (!sheet) {
    throw new Error("Sheet '" + config.sheetName + "' not found");
  }

  // Initialize bulk email log
  var logSheet = ensureBulkEmailLogSheet();
  
  var campaignId = generateCampaignId();
  var startTime = new Date();
  
  // Get headers
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var nameCol = headers.indexOf("Name");
  var emailCol = headers.indexOf("Email");
  var phoneCol = headers.indexOf("Phone");
  var serviceCol = headers.indexOf("Service") !== -1 ? headers.indexOf("Service") : headers.indexOf("Service Interested In");
  var statusCol = headers.indexOf("Status");

  if (emailCol === -1) {
    throw new Error("Email column not found in sheet");
  }

  // Get only the selected rows
  var selectedData = sheet.getRange(config.startRow, 1, config.numRows, sheet.getLastColumn()).getValues();
  
  // Build recipient list from selected rows
  var recipients = [];
  var seenEmails = {}; // Deduplicate emails
  
  for (var i = 0; i < selectedData.length; i++) {
    var row = selectedData[i];
    var email = row[emailCol];
    var name = nameCol !== -1 ? row[nameCol] : "";
    var phone = phoneCol !== -1 ? row[phoneCol] : "";
    var service = serviceCol !== -1 ? row[serviceCol] : "";
    var status = statusCol !== -1 ? row[statusCol] : "";

    // Skip if no email
    if (!email || email.toString().trim() === "") continue;
    
    email = email.toString().trim().toLowerCase();
    
    // Skip duplicates
    if (seenEmails[email]) continue;
    
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

  if (recipients.length === 0) {
    Logger.log("No valid email addresses in selected rows");
    return { success: false, message: "No valid email addresses in selection" };
  }

  // Check quota
  if (recipients.length > MAX_EMAILS_PER_BATCH) {
    throw new Error("Recipient count (" + recipients.length + ") exceeds max batch size (" + MAX_EMAILS_PER_BATCH + ")");
  }

  // Preview mode - just log what would be sent
  if (config.previewOnly) {
    Logger.log("PREVIEW MODE - Would send to " + recipients.length + " selected recipients:");
    for (var j = 0; j < Math.min(5, recipients.length); j++) {
      var preview = recipients[j];
      var previewSubject = applyMergeFields(config.subject, preview);
      var previewBody = applyMergeFields(config.body, preview);
      Logger.log("───────────────────────────");
      Logger.log("To: " + preview.email + " (" + preview.name + ")");
      Logger.log("Subject: " + previewSubject);
      Logger.log("Body:\n" + previewBody);
    }
    Logger.log("───────────────────────────");
    Logger.log("Total recipients: " + recipients.length);
    return {
      success: true,
      preview: true,
      recipientCount: recipients.length,
      sampleRecipients: recipients.slice(0, 5)
    };
  }

  // Send emails
  var sentCount = 0;
  var errorCount = 0;
  var errors = [];

  for (var k = 0; k < recipients.length; k++) {
    var recipient = recipients[k];
    
    try {
      var personalizedSubject = applyMergeFields(config.subject, recipient);
      var personalizedBody = applyMergeFields(config.body, recipient);
      
      GmailApp.sendEmail(recipient.email, personalizedSubject, personalizedBody, {
        name: "Jason — The Real Help, LLC",
        replyTo: JASON_EMAIL
      });
      
      sentCount++;
      
      // Rate limiting - wait 1 second between emails
      if (k < recipients.length - 1) {
        Utilities.sleep(EMAIL_DELAY_MS);
      }
      
    } catch (err) {
      errorCount++;
      errors.push({ email: recipient.email, error: err.message });
      Logger.log("Error sending to " + recipient.email + ": " + err.message);
    }
  }

  var endTime = new Date();
  var duration = (endTime - startTime) / 1000; // seconds

  // Log campaign summary
  logCampaignSummary(logSheet, {
    campaignId: campaignId,
    campaignName: config.campaignName || "Selected Rows Campaign",
    sheetName: config.sheetName,
    filters: "Selected rows " + config.startRow + "-" + (config.startRow + config.numRows - 1),
    totalRecipients: recipients.length,
    sentCount: sentCount,
    errorCount: errorCount,
    startTime: startTime,
    endTime: endTime,
    durationSeconds: duration
  });

  Logger.log("Selected rows email complete: " + sentCount + " sent, " + errorCount + " errors");
  
  return {
    success: true,
    campaignId: campaignId,
    sentCount: sentCount,
    errorCount: errorCount,
    totalRecipients: recipients.length,
    errors: errors,
    durationSeconds: duration
  };
}

// ─── ONE-TIME SETUP ────────────────────────────────────────────────────────

/**
 * Run this ONCE manually from the Apps Script editor to create
 * the daily trigger for processFollowUps.
 * Can also be run from the menu: CRM Actions > Run Setup
 */
function runSetup() {
  // Remove any existing follow-up triggers first
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "processFollowUps") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Create a new daily trigger at 9 AM
  ScriptApp.newTrigger("processFollowUps")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();

  Logger.log("Daily follow-up trigger created. Runs every day at 9 AM.");
  
  // Also ensure bulk email log sheet exists
  ensureBulkEmailLogSheet();
  Logger.log("Bulk email log sheet initialized.");
  
  // Show confirmation
  SpreadsheetApp.getUi().alert(
    'Setup Complete!',
    'Daily follow-up trigger created (runs at 9 AM).\nBulk Email Log sheet initialized.\n\nYou\'re all set!',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}