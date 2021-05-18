function getObjectsFromSheets(sheet) {
  //sheet = typeof sheet === "string" ? SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet): sheet;
  if (!sheet) return [];
  let ss = sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
  let lastRow = ss.getLastRow(), lastColumn = ss.getLastColumn();
  let values = ss.getRange(1, 1, lastRow, lastColumn).getValues();
  const [header, ...body] = values;
  let data = body.map(row => {
    let temp = {};
    header.forEach((c, i) => temp[c] = row[i]);
    return temp;
  })
  return data;
}

function main() {
  let social = getObjectsFromSheets('social');
  console.log(social);
}
