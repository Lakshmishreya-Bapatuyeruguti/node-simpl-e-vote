const Joi = require('joi');

const addCandidateSchema = Joi.object({
  name: Joi.string().required(),
  candidateAddress: Joi.string()
    .required()
    .regex(/^0x[a-fA-F0-9]{40}$/),
  partyName: Joi.string().required(),
  connectedAddress: Joi.string()
    .required()
    .regex(/^0x[a-fA-F0-9]{40}$/),
});

module.exports = addCandidateSchema;
