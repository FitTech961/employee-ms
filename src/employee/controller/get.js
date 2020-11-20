const { isEmpty } = require('lodash');

const { makeError } = require('../../errors/utils');
const { logger } = require('../../utils/logger');
const { getEmployeesService } = require('../service');

async function getEmployees(db, req, res) {
  const { query } = req;
  try {
    logger.info('Trying to get all employees.');
    const result = await getEmployeesService(db, query);
    logger.info('Got all employees.');

    res.statusCode = 200;
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
  getEmployees,
};
