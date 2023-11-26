
const data = {};
data.employees = require("../model/employees.json");


const getAllEmployee = (req, res) => {
    res.json(data.employees);
  }
const createNewEmployee=(req, res) => {
  
    res.json({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname
    });
  }

  const updateEmployee=(req, res) => {
    res.json({
      "firstname": req.body?.firstname,
      "lastname": req.body?.lastname
    });
  }

  const deleteEmployee=(req, res) => {
    res.json({ "id": req.body.id });
  }

  const getEmployeeByID=(req, res) => {
    res.json({ "id": req.params.id });
  }

  module.exports = {getAllEmployee,createNewEmployee,updateEmployee,deleteEmployee,getEmployeeByID}