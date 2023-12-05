const express = require("express")
const { handleLogin } = require("../../controllers/authController")
const routes= express.Router()

routes.post("/",handleLogin)

module.exports=routes