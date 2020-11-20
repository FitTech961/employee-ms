const { partial } = require('lodash');

const { addEmployee } = require('../employee/controller');

// WIP
function employeeRoute(router, db) {
  router.post('/', partial(addEmployee, db));

  return router;
}

module.exports = employeeRoute;
