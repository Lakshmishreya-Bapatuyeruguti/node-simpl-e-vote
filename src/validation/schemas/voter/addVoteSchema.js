const Joi = require('joi');

const addVoteSchema = Joi.object({
  address: Joi.string()
    .required()
    .regex(/^0x[a-fA-F0-9]{40}$/),
  id: Joi.number().required(),
});

module.exports = addVoteSchema;
