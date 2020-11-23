const { isEmpty } = require('lodash');

const { find, findById } = require('../../db/common_db');
const { makeError } = require('../../errors/utils');

// WIP
async function getEmployees(db, query) {
  if (isEmpty(db)) throw makeError('No db connection', 500);

  const collection = await db.collection('employees');

  let result = [];

  if (isEmpty(query.id)) {
    /** You can search for an employee by passing 0 or many query params of the list below */
    const validSearchQueries = [
      'firstName',
      'lastName',
      'dob',
      'email',
      'phoneNumber',
      'department',
      'role',
      'jobTitle',
      'address',
      'jobDescription',
    ];

    if (!isEmpty(query)) {
      Object.keys(query).forEach((k) => {
        let count = 0;
        validSearchQueries.forEach((search) => {
          if (k !== search) {
            count += 1;
          }
          if (count === validSearchQueries.length) {
            throw makeError(` "${k}" is not a valid search query `, 400);
          }
        });
      });
    }

    /** query is equal to {} if no query is passed it will get all employees */
    result = await find(collection, query);
  } else {
    result = await findById(collection, query.id);
  }

  return result;
}

module.exports = {
  getEmployees,
};
