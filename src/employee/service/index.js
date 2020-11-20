const { addEmployee } = require('./add');
const { getEmployees } = require('./get');
const { updateEmployee } = require('./update');
const { deleteEmployee } = require('./delete');

module.exports = {
  addEmployeeService: addEmployee,
  getEmployeesService: getEmployees,
  updateEmployeeService: updateEmployee,
  deleteEmployeeService: deleteEmployee,
};
