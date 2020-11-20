const { isEmpty, isNull } = require('lodash');

const { update, updateById, find } = require('../../db/common_db');
const { makeError } = require('../../errors/utils');
const { getEmployees } = require('./get');

async function updateEmployee(db, body, query) {
  if (isEmpty(db)) throw makeError('No db connection', 500);

  let employee;

  if (isEmpty(body) || isNull(body)) {
    throw makeError('Empty body', 500);
  } else {
    employee = { ...body };
    employee.updated_date = new Date();
  }

  const collection = await db.collection('employees');

  /** Checking if email or password already exist */
  if (!isEmpty(employee.email) || !isEmpty(employee.phoneNumber)) {
    const searchBy = {};

    if (!isEmpty(employee.email)) searchBy.email = employee.email;
    if (!isEmpty(employee.phoneNumber)) searchBy.phoneNumber = employee.phoneNumber;

    const exist = await find(collection, searchBy);

    /** Not allowed to update if email or password exist */
    if (!isEmpty(exist)) {
      throw makeError('Problem occured, email or phone number already exist.', 500);
    }
  }

  if (isEmpty(query.id)) {
    /** You can search for an employee using email or phoneNumber since both are unique */
    const validSearchQueries = ['email', 'phoneNumber'];

    if (!isEmpty(query)) {
      Object.keys(query).forEach((k) => {
        let count = 0;
        validSearchQueries.forEach((search) => {
          if (k !== search) {
            count += 1;
          }
          if (count === validSearchQueries.length) {
            throw makeError(`${k} is not a valid search query `, 400);
          }
        });
      });
    }

    await update(collection, query, employee);
  } else {
    await updateById(collection, query.id, employee);
  }

  const result = await getEmployees(db, query);

  /** Search by Id return JSON object, and by query returns an array of object */
  return result[0] ? result[0] : result;
}

module.exports = {
  updateEmployee,
};
