/**
 * THE REAL HELP, LLC — Google Apps Script CRM Automation
 *
 * SETUP INSTRUCTIONS
 * ------------------
 * 1. Open your Google Sheet (create one if needed).
 * 2. Click Extensions > Apps Script.
 * 3. Paste this entire file, replacing all default content.
 * 4. Click Save (Ctrl+S).
 * 5. Create two tabs in your Sheet: "Lead Pipeline" and "FollowUp Queue".
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
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────

var JASON_EMAIL = "jason@therealhelp.com";
var BOOKING_URL = "https://calendar.app.google/ubdfXKUbazhjgs2VA";
var SHEET_NAME_LEADS = "Lead Pipeline";
var SHEET_NAME_FOLLOWUPS = "FollowUp Queue";

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

// ─── ONE-TIME SETUP ────────────────────────────────────────────────────────

/**
 * Run this ONCE manually from the Apps Script editor to create
 * the daily trigger for processFollowUps.
 * Trigger: Edit > Run > runSetup
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
}
