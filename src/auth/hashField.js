const hmacSHA512 = require('crypto-js/hmac-sha512');
const Base64 = require('crypto-js/enc-base64');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const { PRIVATE_KEY } = process.env;

function hashField(body) {
  const hash = Base64.stringify(hmacSHA512(body.trim(), PRIVATE_KEY));

  return hash;
}

module.exports = {
  hashField,
};
