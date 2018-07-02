const fs = require("fs");
const { data, dict } = require("./initData");
const path = require("path");
const dataPath = path.join(__dirname, "../data.json");

const getDataByID = cellId => {
  const col = cellId[0];
  const row = +cellId.substr(1) - 1;
  const value = data[row][dict[col]];

  if (value === "") {
    return 0;
  }
  if (!value.startsWith("=")) {
    return value;
  }

  return getSumDataByIDs(value.substr(1));
};

const setDataByID = (cellId, value) => {
  const col = cellId[0];
  const row = +cellId.substr(1) - 1;
  data[row][dict[col]] = value.toUpperCase(); // a -> A

  fs.writeFile(dataPath, JSON.stringify({ data: data }), "utf8", err => {
    if (err) {
      console.log("An error occured while writing to file");
    }
    console.log("write file successfully");
  });
};

// compute formula
const getSumDataByIDs = formula => {
  const ids = formula.split("+");
  let sum = 0;

  for (let id of ids) {
    const value = +getDataByID(id);
    if (isNaN(value)) {
      return "#VALUE!";
    } else {
      sum += value;
    }
  }

  return sum + "";
};

module.exports = { getDataByID, setDataByID };
