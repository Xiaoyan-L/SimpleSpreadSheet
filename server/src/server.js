const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());
require("./routes")(app);

app.listen(8080, () => console.log("you app is running at port 8080"));
