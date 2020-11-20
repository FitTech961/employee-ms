const { isEmpty } = require('lodash');

const { removeById } = require('../../db/common_db');
const { makeError } = require('../../errors/utils');

// WIP
async function deleteEmployee(db, id) {
  if (isEmpty(db)) throw makeError('No db connection', 500);

  const collection = await db.collection('employees');

  if (isEmpty(id)) throw makeError('User does not exist', 500);

  const result = await removeById(collection, id);

  if (!result) throw makeError('User does not exist', 500);

  return result;
}

module.exports = {
  deleteEmployee,
};
