const { isEmpty, isNull } = require('lodash');

const { insert, find, updateById } = require('../../db/common_db');
const { makeError } = require('../../errors/utils');
const { hashField } = require('../../auth/hashField');
const { generateJwt } = require('../../auth/generateJwt');

// WIP
async function signin(db, body) {
  if (isEmpty(db)) throw makeError('No db connection', 500);

  if (isEmpty(body) || isNull(body)) {
    throw makeError('Empty body', 500);
  }

  const { email, password } = body;

  const collection = await db.collection('admins');

  const user = await find(collection, { email, password });

  if (isEmpty(user)) {
    throw makeError('Invalid email or password', 500);
  }

  await updateById(collection, user[0]._id, { last_login: new Date() });

  const jwt = generateJwt({ id: user[0]._id, email: user[0].email });

  delete user[0].password;
  delete user[0].created_date;
  delete user[0].updated_date;
  delete user[0].last_login;

  const result = { ...user[0], jwt };

  return result;
}

async function registerUser(db, body) {
  if (isEmpty(db)) throw makeError('No db connection', 500);

  let user;
  const { password } = body;

  if (isEmpty(body) || isNull(body)) {
    throw makeError('Problem registering please contact support.', 500);
  } else {
    user = { ...body };
    user.created_date = new Date();
    user.updated_date = new Date();
    user.password = hashField(password);
  }

  const { email } = user;

  const collection = await db.collection('admins');

  const exist = await find(collection, { email });
  if (!isEmpty(exist)) throw makeError('User already exist', 500);

  const result = await insert(collection, user);

  /** Delete password from the json object to prevent passing it to the front end */
  delete result.ops[0].password;

  return result.ops[0];
}

module.exports = {
  signin,
  registerUser,
};
