
const express = require("express");
const path= require("path")
const app = express();
const Port=5000;
const {logger}= require("./middleware/logEvents")
const errorHandler=require("./middleware/errorHandler")
const cors= require("cors")



//cross origin resource origin
//whitelist to select which domain that is allowed to access the backend
//it is contained in the corsoption
//it takes an origin and a callbakc if the whitelist indexof the origin is in the array you use call back
//if true the callback(null, true)
app.use(logger)
const whiteList= [ "http://localhost:5000/","https://www.google.com/"]
const corsOption= {
    origin:(origin,callback)=>{
        if(whiteList.indexOf(origin)!== -1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error("not ajuhllowed by cors "))
        }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOption))

//for serving static pages
app.use(express.static(path.join(__dirname,"/public")))
app.use("/subdir",express.static(path.join(__dirname,"/public")))



//provifng a route you use app.use
app.use("/subdir",require("./routes/subdir"))
app.use("/",require("./routes/root"))
app.use("/employees",require("./routes/api/employees"))








//setting a custom 404  
app.get("/*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"views","404.html"))
})
//
app.all("*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"views","404.html"))
})

//custom error
app.use(errorHandler)




app.listen(Port, () => {
    console.log(`Example app listening on port ${Port}`)
  })


//app.use() does not accepts regex
//app.all()is used from routing