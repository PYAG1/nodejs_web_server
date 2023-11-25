const express = require("express")
const router = express.Router();
const path = require("path")


router.get("^/$|/index(.html)?",(req,res)=>{
res.sendFile(path.join(__dirname,".." ,"views","index.html"))
})

module.exports= router 

/*//similar to http.createServer
app.get("^/$|/index(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","index.html"))
})



app.get("/oldPage",(req,res)=>{
    res.redirect("/index")
})*/