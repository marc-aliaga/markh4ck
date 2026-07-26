function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.fecha || new Date(),
    data.origen || "quiz",
    data.email || "",
    data.disciplina || "",
    data.nivel || "",
    data.tiempo || "",
    data.objetivo || "",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
