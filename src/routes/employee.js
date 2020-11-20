const { partial } = require('lodash');
const { validate } = require('express-validation');

const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../employee/controller');
const {
  addEmployeeSchema,
  updateEmployeeSchema,
} = require('../validation/schemas/employeeSchemas');
const { bodyValidation } = require('../middlewares/verifyBody');

// WIP
function employeeRoute(router, db) {
  router.post('/', validate(addEmployeeSchema), bodyValidation, partial(addEmployee, db));

  /** Get all employees if no query params are sent
   *  Get employee by id by sending id in query param
   *  Get employee by firstName, lastName, ... by sending 1 or many in the query param
   */
  router.get('/', partial(getEmployees, db));

  router.patch('/', validate(updateEmployeeSchema), bodyValidation, partial(updateEmployee, db));

  router.delete('/', partial(deleteEmployee, db));

  return router;
}

module.exports = employeeRoute;
