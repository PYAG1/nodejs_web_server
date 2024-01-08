const express = require("express");
const path = require("path");
const app = express();
const Port = 5000;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOption = require("./config/corsOptions");
const cookieParser =require("cookie-parser")
const verifyJWT = require("./middleware/VerifyJWT");
const mongoose = require("mongoose");
const connnecrDb = require("./config/dbCon");

connnecrDb()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cross origin resource origin
//whitelist to select which domain that is allowed to access the backend
//it is contained in the corsoption
//it takes an origin and a callbakc if the whitelist indexof the origin is in the array you use call back
//if true the callback(null, true)
app.use(logger);
app.use(corsOption.credentials)
app.use(cors(corsOption.corsOption));


//for serving static pages 
app.use(express.static(path.join(__dirname, "/public")));

//middleware for cookies
 app.use(cookieParser())

app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use(cookieParser());//middleware for cookie parser
//provifng a route you use app.use

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));

app.use("/auth",require("./routes/api/auth")) 
app.use("/refresh",require("./routes/api/refreshToken"))
app.use("/logout",require("./routes/api/logout"))

app.use(verifyJWT)//to add auth to a route 
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
mongoose.connection.once("open",()=>{
  console.log("Connected");
  app.listen(Port, () => {
    console.log(`Example app listening on port ${Port}`);
  });
  
})//listen for the open event to see if it connctrf

//app.use() does not accepts regex
//app.all()is used from routing
