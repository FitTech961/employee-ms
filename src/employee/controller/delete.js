const { isEmpty } = require('lodash');
const { makeError } = require('../../errors/utils');
const { logger } = require('../../utils/logger');
const { deleteEmployeeService } = require('../service');

// WIP
async function deleteEmployee(db, req, res) {
  const { id } = req.query;
  try {
    logger.info('Trying to delete employee.');
    await deleteEmployeeService(db, id);
    logger.info('Successfully deleted employee.');

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
  deleteEmployee,
};
