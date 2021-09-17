const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  fullname: Joi.string().max(64).required(),
  password: Joi.string().max(32).required(),
});

const loginSchema = Joi.object({
  identity: Joi.string().max(64).required(),
  password: Joi.string().max(32).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
