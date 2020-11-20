const { isEmpty, isNull } = require('lodash');

const { insert } = require('../../db/common_db');
const { makeError } = require('../../errors/utils');

// WIP
async function addEmployee(db, body) {
  if (isEmpty(db)) throw makeError('No db connection', 500);

  if (isEmpty(body) || isNull(body)) throw makeError('Empty body', 500);

  const collection = await db.collection('employees');

  const result = await insert(collection, body);

  return result.ops[0];
}

module.exports = {
  addEmployee,
};
