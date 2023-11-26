const express  =require("express")
const Router = express.Router()
const {handleNewUser} = require("../../controllers/RegisterController")


Router.route("/")
.post(handleNewUser)

module.exports= Router