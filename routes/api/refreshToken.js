const express = require("express")
const { handleRefreshToken } = require("../../controllers/refreshTiken controller")

const routes= express.Router()


routes.get("/",handleRefreshToken)

module.exports=routes