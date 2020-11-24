const dotenv = require('dotenv');
const axios = require('axios');
const { expect } = require('chai');

const { generateJwt } = require('../../src/auth/generateJwt');
const db = require('../../src/db');
const { logger } = require('../../src/utils/logger');
const { find } = require('../../src/db/common_db');

describe('Integration test for add employee', () => {
  let jwt;
  const baseUrl = 'http://localhost:5000';

  const testEmployee = {
    firstName: 'Richard',
    lastName: 'Nassar',
    dob: '25-12-1995',
    phoneNumber: '71714112',
    email: 'rich@fittech.com',
    department: 'Innovation Center',
    jobTitle: 'Full stack engineer',
    address: 'Beirut, Lebanon',
    jobDescription: 'Developing front end and back end ',
    role: 'employee',
  };

  const authorizationError = {
    description: 'Unauthorized User',
    message: 'Unauthorized',
  };

  const validationError = {
    message: 'Validation Error',
  };

  const headerObject = {
    authorization: 'Bearer 123',
  };

  before(async () => {
    const user = await axios.get(`${baseUrl}/employee?email=anthony@areeba.com`, {
      headers: headerObject,
    });

    jwt = generateJwt({ id: user.data[0]._id, email: user.data[0].email });

    headerObject.authorization = `Bearer ${jwt}`;
  });

  // Success Scenario
  //   it('Should return 200 on POST create individual risk control for country', async () => {
  //     const res = await axios.post(`${baseUrl}/employee`, testEmployee, {
  //       headers: headerObject,
  //     });
  //     expect(res.status).to.be.equal(201);
  //   });

  it('Should return 400 on add employee if email is missing', async () => {
    delete testEmployee.email;
    try {
      await axios.post(`${baseUrl}/employee`, testEmployee, {
        headers: headerObject,
      });
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.deep.equal(validationError);
    }
  });

  it('Should return 400 on add employee if firstname is missing', async () => {
    delete testEmployee.firstname;
    try {
      await axios.post(`${baseUrl}/employee`, testEmployee, {
        headers: headerObject,
      });
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.deep.equal(validationError);
    }
  });

  it('Should return 400 on add employee if lastname is missing', async () => {
    delete testEmployee.lastname;
    try {
      await axios.post(`${baseUrl}/employee`, testEmployee, {
        headers: headerObject,
      });
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.deep.equal(validationError);
    }
  });

  it('Should return 400 on add employee if dob is missing', async () => {
    delete testEmployee.dob;
    try {
      await axios.post(`${baseUrl}/employee`, testEmployee, {
        headers: headerObject,
      });
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.deep.equal(validationError);
    }
  });

  it('Should return 400 on add employee if address is missing', async () => {
    delete testEmployee.address;
    try {
      await axios.post(`${baseUrl}/employee`, testEmployee, {
        headers: headerObject,
      });
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.deep.equal(validationError);
    }
  });

  it('Should return 400 on add employee if jobTitle is missing', async () => {
    delete testEmployee.jobTitle;
    try {
      await axios.post(`${baseUrl}/employee`, testEmployee, {
        headers: headerObject,
      });
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.deep.equal(validationError);
    }
  });

  it('Should return 400 on add employee if role is missing', async () => {
    delete testEmployee.role;
    try {
      await axios.post(`${baseUrl}/employee`, testEmployee, {
        headers: headerObject,
      });
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.deep.equal(validationError);
    }
  });
});
