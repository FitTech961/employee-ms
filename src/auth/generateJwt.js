const jwt = require('jsonwebtoken');

function generateJwt(payload) {
  const { JWT_SECRET } = process.env;

  const jsonToken = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 600 });

  return jsonToken;
}

module.exports = {
  generateJwt,
};
