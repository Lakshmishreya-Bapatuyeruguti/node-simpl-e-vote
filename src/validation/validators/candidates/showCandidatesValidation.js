const showCandidateschema = require('../../schemas/candidates/showCandidatesSchema');
const showCandidatesValidation = async (req, res, next) => {
  let val = req.params;
  const { error } = showCandidateschema.validate(req.params, {
    abortEarly: false,
  });
  if (error) {
    res.status(422).json({ message: 'Invalid Details', error, val });
  } else {
    next();
  }
};
module.exports = showCandidatesValidation;
