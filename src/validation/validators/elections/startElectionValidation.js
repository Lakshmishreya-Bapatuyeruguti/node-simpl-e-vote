const startElectionSchema = require('../../schemas/elections/startElectionSchema');
const startElectionValidation = async (req, res, next) => {
  const { error } = startElectionSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(422).json({ message: 'Invalid Details', error });
  } else {
    next();
  }
};
module.exports = startElectionValidation;
