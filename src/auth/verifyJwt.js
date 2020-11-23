const jwt = require('jsonwebtoken');

const { logger } = require('../utils/logger');

function verifyJwt(req, res, next) {
  const response = {};

  jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, data) => {
    if (err) {
      logger.error(err);
      res.statusCode = 401;
      response.statusText = 'Unauthorized';
      response.description = `Unauthorized User: ${err}`;
      res.json(response);
    } else {
      req.jwt = {};

      if (data.id) {
        req.jwt.id = data.id;
      }
      req.jwt.email = data.email;
      req.jwt.token = data.token;

      res.statusCode = 200;
      response.statusText = 'OK';
      res.response = response;
      next();
    }
  });
}

module.exports = {
  verifyJwt,
};
