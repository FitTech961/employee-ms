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

    /** Checking that the new modified email doesn't already exist */
    if (
      !isEmpty(query.email) &&
      query.email.trim().toLowerCase() !== employee.email.trim().toLowerCase()
    ) {
      let exist = [];
      const searchBy = {};
      searchBy.email = query.email.trim().toLowerCase();

      exist = await find(collection, searchBy);
      if (!isEmpty(exist)) {
        throw makeError('Problem occured, email  already exist.', 500);
      }
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
