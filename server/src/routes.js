const SpreadSheetController = require("./controllers/SpreadSheetController");

module.exports = app => {
  app.get("/data", SpreadSheetController.index);
  app.get("/data/:cellID", SpreadSheetController.getData);
  app.post("/data/:cellID", SpreadSheetController.update);
};
