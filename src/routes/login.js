const { partial } = require('lodash');
const { validate } = require('express-validation');

const { signin, registerUser } = require('../login/controller');
const { bodyValidation } = require('../middlewares/verifyBody');
const { registerSchema } = require('../validation/schemas/loginSchemas');

function loginRoute(router, db) {
  /** Sign in API using email and password */
  router.post('/signin', bodyValidation, partial(signin, db));

  /** SignUp/Register API */
  router.post('/register', validate(registerSchema), bodyValidation, partial(registerUser, db));

  return router;
}

module.exports = loginRoute;
