const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  fullname: Joi.string().min(4).max(32).required(),
  password: Joi.string().min(6).max(16).required(),
});

const loginSchema = Joi.object({
  identity: Joi.string().min(4).max(12).required(),
  password: Joi.string().min(6).max(16).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
