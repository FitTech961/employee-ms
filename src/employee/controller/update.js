const { isEmpty } = require('lodash');

const { makeError } = require('../../errors/utils');
const { logger } = require('../../utils/logger');
const { updateEmployeeService } = require('../service');

async function updateEmployee(db, req, res) {
  const { body, query } = req;
  try {
    logger.info('Trying to update employee.');
    await updateEmployeeService(db, body, query);
    logger.info('Successfully updated employee.');

    res.statusCode = 201;
    res.send();
  } catch (error) {
    logger.error(error);
    const errorStatus = error.status || 500;
    const errorMessage = !isEmpty(error.message) ? error.message : 'An error has occurred';

    res.statusCode = errorStatus;
    res.send(makeError(errorMessage, errorStatus));
  }
}

module.exports = {
  updateEmployee,
};
