const { isEmpty } = require('lodash');
const { makeError } = require('../../errors/utils');
const { logger } = require('../../utils/logger');
const { addEmployeeService } = require('../service');

// WIP
async function addEmployee(db, req, res) {
  const { body } = req;
  try {
    logger.info('Trying to add employee.');
    const result = await addEmployeeService(db, body);
    logger.info('Successfully added employee.');

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
  addEmployee,
};
