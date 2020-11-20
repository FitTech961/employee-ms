const { ValidationError } = require('express-validation');

const { logger } = require('../utils/logger');

function bodyValidation(err, req, res, next) {
  if (err instanceof ValidationError) {
    logger.error(`${err.error} on ${new Date()}:  ${JSON.stringify(err.details.body)}`);

    const response = {};
    response.message = 'Validation Error';
    return res.status(err.statusCode).json(response);
  }
  return next();
}

module.exports = { bodyValidation };
