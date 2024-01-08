const express = require("express");
const router = express.Router();
const path = require("path");
const {getAllEmployee,createNewEmployee,updateEmployee,deleteEmployee,getEmployeeByID}= require("../../controllers/employeeController");
const verifyJWT = require("../../middleware/VerifyJWT");
const ROLES_LIST = require("../../config/roles_list");
const verifyRole = require("../../middleware/verifyRoles");


router.route("/")
  .get(getAllEmployee)
  .post(verifyRole(ROLES_LIST.Admin,ROLES_LIST.Editor),createNewEmployee)
  .put(verifyRole(ROLES_LIST.Admin,ROLES_LIST.Editor),updateEmployee)
  .delete(verifyRole(ROLES_LIST.Admin),deleteEmployee);

router.route("/:id").get(getEmployeeByID);

module.exports = router;
