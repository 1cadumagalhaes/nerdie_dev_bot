function doGet(e) {
  const { parameter } = e;
  let response = "";
  const path = parameter.path;
  if (path) {
    response = JSON.stringify(getObjectsFromSheets(path));
  }
  return ContentService.createTextOutput(response);
}

function doPost() {
  return ContentService.createTextOutput("Hello to funcionando no post");
}