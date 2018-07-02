const { setDataByID, getDataByID } = require("../modules/SpreadSheet");
const { data } = require("../modules/SpreadSheet/initData");

const index = (req, res) => {
  try {
    res.status(200).send(data);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const update = (req, res) => {
  try {
    const { cellID } = req.params;
    const { value } = req.body;
    setDataByID(cellID, value);
    res.status(200).json({ msg: "update success" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const getData = (req, res) => {
  try {
    const { cellID } = req.params;
    const value = getDataByID(cellID);
    res.status(200).send(value);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

module.exports = { index, update, getData };
