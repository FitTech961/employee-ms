const { addEmployee } = require('./add');
const { getEmployees } = require('./get');
const { updateEmployee } = require('./update');
const { deleteEmployee } = require('./delete');

module.exports = {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
