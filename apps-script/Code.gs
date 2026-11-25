/**
 * Receiver for the therealhelp.com lead form.
 * Bound to the "The Real Help Leads" Google Sheet.
 *
 * Setup: replace SECRET below with a long random string (the same value goes
 * in Vercel as LEAD_WEBHOOK_SECRET). Keep the real value out of git.
 * Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone.
 */
var SECRET = 'PASTE_SECRET_HERE';
var HEADERS = ['Received', 'Name', 'Phone or email', 'Business', 'What they want automated', 'Source', 'Status'];
var EVENT_HEADERS = ['Received', 'Event', 'Action', 'Location', 'Form', 'Result', 'Page', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'ref', 'Referrer host', 'Session'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (!SECRET || SECRET === 'PASTE_SECRET_HERE' || data.secret !== SECRET) return reply_({ ok: false, error: 'unauthorized' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Analytics events (call/book/email clicks, form views and submits) land on
    // their own Events tab, which is always kept after the lead tab.
    if (data.kind === 'event') {
      var events = getEventsSheet_(ss);
      events.appendRow([
        new Date(),
        data.name,
        data.action,
        data.location,
        data.form,
        data.result,
        data.page,
        data.utm_source,
        data.utm_medium,
        data.utm_campaign,
        data.utm_content,
        data.ref,
        data.referrerHost,
        data.sid,
      ]);
      return reply_({ ok: true });
    }

    var sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    sheet.appendRow([new Date(), data.name, data.contact, data.business, data.message, data.source, 'New']);
    return reply_({ ok: true });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  }
}

/**
 * Return the Events sheet, creating it (with frozen, bold headers) if missing.
 * Inserted at index 1 so the lead tab always stays first.
 */
function getEventsSheet_(ss) {
  var sheets = ss.getSheets();
  var events = null;
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() === 'Events') {
      events = sheets[i];
      break;
    }
  }
  if (!events) {
    events = ss.insertSheet('Events', 1);
  }
  if (events.getLastRow() === 0) {
    events.appendRow(EVENT_HEADERS);
    events.setFrozenRows(1);
    events.getRange(1, 1, 1, EVENT_HEADERS.length).setFontWeight('bold');
  }
  return events;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
