const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { validate, ValidationError, Joi } = require('express-validation');

const { logger } = require('../utils/logger');

const schema = {
  headers: Joi.object({
    authorization: Joi.string()
      .regex(/^Bearer /)
      .required(),
  }).unknown(),
};

const AuthenticatedRouter = function () {
  const router = new express.Router({ mergeParams: true });

  router.use(cors());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json({ limit: '5mb' }));
  router.use(express.static('public'));

  router.all('/*', validate(schema), (err, req, res, next) => {
    if (err instanceof ValidationError) {
      logger.error(`${err.error} on ${new Date()}:  ${JSON.stringify(err.details.headers)}`);

      const response = {};
      response.message = 'Validation Error';
      return res.status(err.statusCode).json(response);
    }
    return next();
  });

  return router;
};

module.exports = AuthenticatedRouter;
