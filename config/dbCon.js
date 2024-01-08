const mongoose = require("mongoose")
const connnecrDb = async ()=>{
    try {
   await mongoose.connect(process.env.URL,{useUnifiedTopology:true,useNewUrlParser:true})     
    } catch (error) {
        console.log(error);
    }
}
module.exports= connnecrDb