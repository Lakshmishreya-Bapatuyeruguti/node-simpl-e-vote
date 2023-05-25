const addVoteSchema = require('../../schemas/voter/addVoteSchema');
const addVoteValidation = async (req, res, next) => {
  let val = req.params;
  const { error } = addVoteSchema.validate(req.params, {
    abortEarly: false,
  });
  if (error) {
    res.status(422).json({ message: 'Invalid Details', error, val });
  } else {
    next();
  }
};
module.exports = addVoteValidation;
