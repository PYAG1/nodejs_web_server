const express = require("express");
const path = require("path");
const app = express();
const Port = 5000;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOption = require("./config/corsOptions");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cross origin resource origin
//whitelist to select which domain that is allowed to access the backend
//it is contained in the corsoption
//it takes an origin and a callbakc if the whitelist indexof the origin is in the array you use call back
//if true the callback(null, true)
app.use(logger);

app.use(cors(corsOption));

//for serving static pages
app.use(express.static(path.join(__dirname, "/public")));

app.use("/subdir", express.static(path.join(__dirname, "/public")));

//provifng a route you use app.use

app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

//setting a custom 404
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
//
app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//custom error
app.use(errorHandler);

app.listen(Port, () => {
  console.log(`Example app listening on port ${Port}`);
});

//app.use() does not accepts regex
//app.all()is used from routing
