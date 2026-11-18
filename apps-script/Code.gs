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

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (!SECRET || SECRET === 'PASTE_SECRET_HERE' || data.secret !== SECRET) return reply_({ ok: false, error: 'unauthorized' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
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

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
