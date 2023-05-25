const Joi = require('joi');

const startElectionSchema = Joi.object({
  connectedAddress: Joi.string()
    .required()
    .regex(/^0x[a-fA-F0-9]{40}$/),
});

module.exports = startElectionSchema;
