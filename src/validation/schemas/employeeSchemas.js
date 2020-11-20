const { Joi } = require('express-validation');

const validRoles = ['admin', 'employee'];

// const validDepartments = ['HR ', 'IT', 'Accounting', 'Management', 'Finance']; // keep or remove?

const addEmployeeSchema = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.string() /** dd-mm-yyyy */
      .regex(/^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\d\d/)
      .required(),
    phoneNumber: Joi.string()
      .regex(/^\d{7,8}$/)
      .required(),
    email: Joi.string().email().required(),
    department: Joi.string().required(),
    jobTitle: Joi.string().required(),
    address: Joi.string().required(),
    jobDescription: Joi.string().required(),
    role: Joi.string()
      .valid(...validRoles)
      .required(),
  }).unknown(),
};

const updateEmployeeSchema = {
  body: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    dob: Joi.string() /** dd-mm-yyyy */
      .regex(/^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\d\d/)
      .optional(),
    phoneNumber: Joi.string()
      .regex(/^\d{7,8}$/)
      .optional(),
    email: Joi.string().email().optional(),
    department: Joi.string().optional(),
    jobTitle: Joi.string().optional(),
    address: Joi.string().optional(),
    jobDescription: Joi.string().optional(),
    role: Joi.string()
      .valid(...validRoles)
      .optional(),
  }).unknown(),
};

module.exports = {
  addEmployeeSchema,
  updateEmployeeSchema,
};
