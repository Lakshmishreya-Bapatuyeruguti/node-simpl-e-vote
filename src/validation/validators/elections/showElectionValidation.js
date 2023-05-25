const showElectionSchema = require('../../schemas/elections/showElectionSchema');
const showElectionValidation = async (req, res, next) => {
  let val = req.params;
  const { error } = showElectionSchema.validate(req.params, {
    abortEarly: false,
  });
  if (error) {
    res.status(422).json({ message: 'Invalid Details', error, val });
  } else {
    next();
  }
};
module.exports = showElectionValidation;
