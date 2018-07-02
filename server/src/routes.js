const {index, getData, update} = require("./controllers");

module.exports = app => {
  app.get("/data", index);
  app.get("/data/:cellID", getData);
  app.post("/data/:cellID", update);
};
