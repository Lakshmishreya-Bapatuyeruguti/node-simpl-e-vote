const Joi = require('joi');

const showElectionSchema = Joi.object({
  networkname: Joi.string().valid('Mumbai', 'Sepolia').required(),
});

module.exports = showElectionSchema;
