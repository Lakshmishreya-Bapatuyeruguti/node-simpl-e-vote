const Joi = require('joi');

const showCandidatesSchema = Joi.object({
  id: Joi.number().required(),
});

module.exports = showCandidatesSchema;
