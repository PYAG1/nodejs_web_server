const express  =require("express")
const { handleLOGOUT } = require("../../controllers/logout")
const Router = express.Router()



Router.get("/",handleLOGOUT)

module.exports= Router