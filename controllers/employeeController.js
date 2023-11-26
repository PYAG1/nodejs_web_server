const data = {
  employees: require("../model/employees.json"),
  setEmployee: (data) => {
    this.employees = data;
  },
};

const getAllEmployee = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
    const newEmployee = {
      id: Math.ceil(Math.random() * 1000000000),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
  
    if (!newEmployee.firstname || !newEmployee.lastname) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
  
    // Use push to add the new employee to the data.employees array
    data.employees.push(newEmployee);
  
    res.status(201).json(data.employees);
  };
  
  module.exports = createNewEmployee;
  
const updateEmployee = (req, res) => {
    const employeeId = parseInt(req.body.id);
  
    // Find the index of the employee in the data array
    const index = data.employees.findIndex((emp) => emp.id === employeeId);
  
    // Check if the employee with the given ID exists
    if (index === -1) {
      return res.status(404).json({ error: "Employee not found" });
    }
  
    // Update the employee data
    data.employees[index].firstname = req.body.firstname || data.employees[index].firstname;
    data.employees[index].lastname = req.body.lastname || data.employees[index].lastname;
  
    // Send the updated employee data as the response
    res.json(data.employees);
  };

  const deleteEmployee = (req, res) => {
    const employeeId = parseInt(req.body.id);
  
    // Find the employee with the given ID
    const employeeIndex = data.employees.findIndex(emp => emp.id === employeeId);
  
    // Check if the employee with the given ID exists
    if (employeeIndex === -1) {
      return res.status(404).json({ error: "Employee not found" });
    }
  
    // Remove the employee at the found index
    data.employees.splice(employeeIndex, 1);
  
    // Send the updated employee list as the response
    res.json(data.employees);
  };

const getEmployeeByID = (req, res) => {
    const employee = data.employees.find((emp=> emp.id === parseInt(req.params.id)));
    if(!employee) {
        return res.status(400).json({"message": ` employee with id ${req.params.id} not found`})
    }
  res.json({ id: req.params.id });
};

module.exports = {
  getAllEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByID,
};
