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
const { verifyJwt } = require('../auth/verifyJwt');

function employeeRoute(router, db) {
  router.post(
    '/',
    validate(addEmployeeSchema),
    bodyValidation,
    verifyJwt,
    partial(addEmployee, db),
  );

  /** Get all employees if no query params are sent
   *  Get employee by id by sending id in query param
   *  Get employee by firstName, lastName, ... by sending 1 or many in the query param
   */
  router.get('/', partial(getEmployees, db));

  router.patch(
    '/',
    validate(updateEmployeeSchema),
    bodyValidation,
    verifyJwt,
    partial(updateEmployee, db),
  );

  router.delete('/', verifyJwt, partial(deleteEmployee, db));

  return router;
}

module.exports = employeeRoute;
