const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data.json');
const dict = {};
const size = 10;

// read or creat data
const initSheet = () => {
  initDict();
  let data = [];
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8')).data;
  } else {
    for (let i = 0; i < size; i++) {
      data[i] = new Array(size).fill("");
    }
  }
  return data;
};

// init number to A-Z dictionary
const initDict = () => {
  let start = "A".charCodeAt(0);
  for (let i = 0; i < size; i++) {
    let letter = String.fromCharCode(start + i);
    dict[letter] = i;
  }
}

const data = initSheet();

module.exports = { data, dict };