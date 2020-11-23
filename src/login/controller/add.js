const { isEmpty } = require('lodash');
const { makeError } = require('../../errors/utils');
const { logger } = require('../../utils/logger');
const { signinService, registerUserService } = require('../service');

async function signin(db, req, res) {
  const { body } = req;

  try {
    logger.info('Trying to login.');
    const result = await signinService(db, body);
    logger.info('Successfully logged in.');

    res.statusCode = 201;
    res.send(result);
  } catch (error) {
    logger.error(error);
    const errorStatus = error.status || 500;
    const errorMessage = !isEmpty(error.message) ? error.message : 'An error has occurred';

    res.statusCode = errorStatus;
    res.send(makeError(errorMessage, errorStatus));
  }
}

async function registerUser(db, req, res) {
  const { body } = req;

  try {
    logger.info('Trying to register a new user');
    const result = await registerUserService(db, body);
    logger.info('Successfully registered a new user.');

    res.statusCode = 201;
    res.send(result);
  } catch (error) {
    logger.error(error);
    const errorStatus = error.status || 500;
    const errorMessage = !isEmpty(error.message) ? error.message : 'An error has occurred';

    res.statusCode = errorStatus;
    res.send(makeError(errorMessage, errorStatus));
  }
}

module.exports = {
  signin,
  registerUser,
};
