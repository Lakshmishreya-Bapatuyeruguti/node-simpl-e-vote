const loginSchema = require('../../schemas/auth/authSchema');
const loginValidation = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).json({ message: 'Invalid Details', error });
  } else {
    next();
  }
};
module.exports = loginValidation;
