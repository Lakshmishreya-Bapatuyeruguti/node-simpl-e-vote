const endElectionSchema = require('../../schemas/elections/endElectionSchema');
const endElectionValidation = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const { error } = endElectionSchema.validate(
    { id, ...body },
    {
      abortEarly: false,
    },
  );
  if (error) {
    res.status(422).json({ message: 'Invalid Details', error });
  } else {
    next();
  }
};
module.exports = endElectionValidation;
