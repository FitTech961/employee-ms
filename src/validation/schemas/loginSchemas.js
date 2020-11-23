const { Joi } = require('express-validation');

const validRoles = ['admin', 'employee'];

const registerSchema = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string()
      .regex(/^\d{7,8}$/)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()
      .valid(...validRoles)
      .required(),
  }).unknown(),
};

module.exports = {
  registerSchema,
};
