const AddElectionSchema = require('../../schemas/elections/addelectionSchema');
const addElectionValidation = async (req, res, next) => {
  const { error } = AddElectionSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).json({ message: 'Invalid Details', error });
  } else {
    next();
  }
};
module.exports = addElectionValidation;
