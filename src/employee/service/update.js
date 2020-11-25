/* eslint-disable no-lonely-if */
const { isEmpty, isNull } = require('lodash');

const { update, updateById, find } = require('../../db/common_db');
const { makeError } = require('../../errors/utils');
const { getEmployees } = require('./get');

async function updateEmployee(db, body, query) {
  if (isEmpty(db)) throw makeError('No db connection', 500);

  const { email, id } = query;
  if (isEmpty(id) && isEmpty(email)) {
    throw makeError('Please provide a search query email or id ', 400);
  }

  let employee;

  if (isEmpty(body) || isNull(body)) {
    throw makeError('Empty body', 400);
  } else {
    employee = { ...body };
    employee.updated_date = new Date();
  }

  const collection = await db.collection('employees');

  /** if id not empty search by id */
  if (!isEmpty(id)) {
    if (isEmpty(employee.email)) {
      /** if employee email is empty no need for further checking we can directly update */
      await updateById(collection, id, employee);
    } else {
      const searchBy = email.employee;
      const exist = await find(collection, searchBy);
      if (!isEmpty(exist)) {
        throw makeError('Problem occured, email  already exist.', 400);
      }

      /** If no bad request occured update by id */
      await updateById(collection, id, employee);
    }
  } else {
    /** if id is empty search by email */
    if (!isEmpty(employee.email)) {
      if (employee.email.trim().toLowerCase() === email.trim().toLowerCase()) {
        await update(collection, { email }, employee);
      } else {
        const searchBy = email.employee;
        const exist = await find(collection, searchBy);
        if (!isEmpty(exist)) {
          throw makeError('Problem occured, email  already exist.', 400);
        }
        await update(collection, { email }, employee);
      }
    } else {
      await update(collection, { email }, employee);
    }
  }

  const result = await getEmployees(db, query);

  /** Search by Id return JSON object, and by query returns an array of object */
  return result[0] ? result[0] : result;
}

module.exports = {
  updateEmployee,
};
