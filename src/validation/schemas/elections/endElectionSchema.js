const Joi = require('joi');

const endElectionSchema = Joi.object({
  id: Joi.number().required(),
  connectedAddress: Joi.string()
    .required()
    .regex(/^0x[a-fA-F0-9]{40}$/),
});

module.exports = endElectionSchema;
