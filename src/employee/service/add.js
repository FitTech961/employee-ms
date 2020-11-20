const { isEmpty, isNull } = require('lodash');

const { insert, find } = require('../../db/common_db');
const { makeError } = require('../../errors/utils');

// WIP
async function addEmployee(db, body) {
  if (isEmpty(db)) throw makeError('No db connection', 500);

  let employee;

  if (isEmpty(body) || isNull(body)) {
    throw makeError('Problem adding a user', 500);
  } else {
    employee = { ...body };
    employee.created_date = new Date();
    employee.updated_date = new Date();
  }

  const { email, phoneNumber } = employee;

  const collection = await db.collection('employees');

  const exist = await find(collection, { email, phoneNumber });
  if (!isEmpty(exist)) throw makeError('User already exist', 500);

  const result = await insert(collection, employee);

  return result.ops[0];
}

module.exports = {
  addEmployee,
};
