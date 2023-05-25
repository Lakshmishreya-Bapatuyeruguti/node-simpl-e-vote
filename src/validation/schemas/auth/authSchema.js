const Joi = require('joi');

const loginSchema = Joi.object({
  connectedAccount: Joi.string()
    .required()
    .regex(/^0x[a-fA-F0-9]{40}$/),
});

module.exports = loginSchema;
