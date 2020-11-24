const { isEmpty, isNull } = require('lodash');

const { insert, find } = require('../../db/common_db');
const { makeError } = require('../../errors/utils');

// WIP
async function addEmployee(db, body) {
  let employee;

  if (isEmpty(body) || isNull(body)) {
    throw makeError('Problem adding an employee', 500);
  } else {
    employee = { ...body };
    employee.created_date = new Date();
    employee.updated_date = new Date();
  }

  if (isEmpty(db)) throw makeError('No db connection', 500);

  const { email, phoneNumber } = employee;

  const collection = await db.collection('employees');

  const existEmail = await find(collection, { email });
  if (!isEmpty(existEmail)) throw makeError('User email already exist', 500);

  const existMobile = await find(collection, { phoneNumber });
  if (!isEmpty(existMobile)) throw makeError('User mobile already exist', 500);

  const result = await insert(collection, employee);

  return result.ops[0];
}

module.exports = {
  addEmployee,
};
