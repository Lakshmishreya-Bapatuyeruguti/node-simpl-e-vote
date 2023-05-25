const addCandidateSchema = require('../../schemas/candidates/addCandidateSchema');
const addCandidateValidation = async (req, res, next) => {
  const { error } = addCandidateSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(422).json({ message: 'Invalid Details', error });
  } else {
    next();
  }
};
module.exports = addCandidateValidation;
