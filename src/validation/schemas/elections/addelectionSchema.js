const Joi = require('joi');

const AddElectionSchema = Joi.object({
  organizerAddress: Joi.string()
    .required()
    .regex(/^0x[a-fA-F0-9]{40}$/),
  electionStarted: Joi.boolean().required().truthy('true').falsy('false'),
  electionEnded: Joi.boolean().required().truthy('true').falsy('false'),
  networkName: Joi.string().valid('Mumbai', 'Sepolia').required(),
});

module.exports = AddElectionSchema;
