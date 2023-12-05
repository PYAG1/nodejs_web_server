const express = require("express");
const router = express.Router();
const path = require("path");
const {getAllEmployee,createNewEmployee,updateEmployee,deleteEmployee,getEmployeeByID}= require("../../controllers/employeeController");
const verifyJWT = require("../../middleware/VerifyJWT");



router.route("/")
  .get(getAllEmployee)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployeeByID);

module.exports = router;
