const { assert } = require('chai');

const { removeById } = require('../../src/db/common_db');
const db = require('../../src/db');
const { addEmployeeService } = require('../../src/employee/service');

describe('Unit test adding an employee', () => {
  let collection;
  let employeeId;
  db.connect();

  const testEmployee = {
    firstName: 'Richard',
    lastName: 'Nassar',
    dob: '25-12-1995',
    phoneNumber: '71717312',
    email: 'rich@fittech.com',
    department: 'Innovation Center',
    jobTitle: 'Full stack engineer',
    address: 'Beirut, Lebanon',
    jobDescription: 'Developing front end and back end ',
    role: 'employee',
  };

  const dbError = {
    status: 500,
    message: 'No db connection',
  };

  const emptyEmployee = {
    status: 500,
    message: 'Problem adding an employee',
  };

  //   before(async () => {
  //     await db.connect();
  //     collection = db.collection('employees');
  //   });

  //   after(async () => {
  //     await removeById(collection, employeeId);
  //   });

  it('should check if addEmployeeService is a function', () => {
    assert.isFunction(addEmployeeService);
  });

  // success scenario
  //   it('should add employee', async () => {
  //     const actual = await addEmployeeService(db, testEmployee);
  //     employeeId = actual._id;

  //     assert.equal(actual.email, testEmployee.email);
  //     assert.equal(actual.phoneNumber, testEmployee.phoneNumber);
  //     assert.equal(actual.dob, testEmployee.dob);
  //     assert.equal(actual.department, testEmployee.department);
  //     assert.equal(actual.jobTitle, testEmployee.jobTitle);
  //     assert.equal(actual.address, testEmployee.address);
  //     assert.equal(actual.role, testEmployee.role);
  //     assert.equal(actual.lastName, testEmployee.lastName);
  //     assert.equal(actual.firstName, testEmployee.firstName);
  //   });

  it('should throw error if db is null', async () => {
    try {
      await addEmployeeService(null, testEmployee);
      assert.fail('fail', 'error is not thrown');
    } catch (error) {
      assert.deepInclude(error, dbError);
    }
  });

  it('should throw error if db is undefined', async () => {
    try {
      await addEmployeeService(undefined, testEmployee);
      assert.fail('fail', 'error is not thrown');
    } catch (error) {
      assert.deepInclude(error, dbError);
    }
  });

  it('should throw error if employee is null', async () => {
    try {
      await addEmployeeService(db, null);
      assert.fail('fail', 'error is not thrown');
    } catch (error) {
      assert.deepInclude(error, emptyEmployee);
    }
  });

  it('should throw error if employee is undefinied', async () => {
    try {
      await addEmployeeService(db, undefined);
      assert.fail('fail', 'error is not thrown');
    } catch (error) {
      assert.deepInclude(error, emptyEmployee);
    }
  });

  it('should throw error if employee is empty', async () => {
    try {
      await addEmployeeService(db, {});
      assert.fail('fail', 'error is not thrown');
    } catch (error) {
      assert.deepInclude(error, emptyEmployee);
    }
  });
});
