const jwt = require('jsonwebtoken');
const loginUser = async (req, res) => {
  try {
    const { connectedAccount } = req.body;
    if (connectedAccount) {
      const token = jwt.sign(
        { connectedAddess: connectedAccount },
        process.env.JWT_SEC_KEY,
      );
      res.status(200).json({ message: 'Login success.', token });
    } else {
      res.status(422).json({ message: 'Login failed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ error });
  }
};
module.exports = loginUser;
