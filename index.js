const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const csvFilename = process.argv[2];
const jsonFilename = 'customer-data.json';

const parseCsv = (filename) => {
  if (!filename) {
    console.log('Provide a valide filename.\n');
    console.log('Format: node index.js [filename]');
    return;
  }

  const jsonArray = [];
  csv()
  .fromFile(path.join(__dirname, filename))
  .on('json', (jsonObj, index) => {
    console.log(`Row ${index}:\n`, jsonObj);
    jsonArray.push(jsonObj);
  })
  .on('end',  () => {
    fs.writeFileSync(
      path.join(__dirname, jsonFilename),
      JSON.stringify(jsonArray)
    );
    console.log('CSV file processed.\n');
    console.log(`New JSON file created ${jsonFilename}`)
  });
}

parseCsv(csvFilename);