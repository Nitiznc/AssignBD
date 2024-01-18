// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1eRujNQYov-tZ8j9yvkah6lSzJOpNweMF";
// sheetName is the name of the TAB in your spreadsheet
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL)
  .then((response) => response.text())
  .then((csvText) => handleResponse(csvText));

function handleResponse(csvText) {
  let sheetObjects = csvToObjects(csvText);
  // sheetObjects is now an Array of Objects
  console.log(sheetObjects);
}

function csvToObjects(csv) {
  const csvRows = csv.split("\n");
  const propertyNames = csvSplit(csvRows[0]);
  let objects = [];
  for (let i = 1, max = csvRows.length; i < max; i++) {
    let thisObject = {};
    let row = csvSplit(csvRows[i]);
    for (let j = 0, max = row.length; j < max; j++) {
      thisObject[propertyNames[j]] = row[j];
    }
    objects.push(thisObject);
  }
  let nameOfArray = [];
  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    nameOfArray.push(Object.values(object)[7]);
  }
  let name = nameOfArray[0];
  // console.log(nameOfArray);
  let count = 1;
  let arrOfNameFor7Day = [];
  for (let i = 1; i < nameOfArray.length; i++) {
    if (nameOfArray[i] == name) {
      count++;
      if (count >= 7) {
        arrOfNameFor7Day.push(nameOfArray[i]);
      }
    } else {
      name = nameOfArray[i];
      count = 1;
    }
  }
  // printing the name of who did 7 days work consecutive
  console.log(new Set(arrOfNameFor7Day));
  // return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
}
