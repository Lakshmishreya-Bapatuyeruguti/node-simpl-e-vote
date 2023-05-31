const jwt = require('jsonwebtoken');
const ethers = require('ethers');
const { sequelize } = require('../../../models');
const Users = sequelize.models.Users;
const loginUser = async (req, res) => {
  try {
    const { connectedAccount, signedMessage, message } = req.body;
    const recoveredAddress = ethers.utils.verifyMessage(message, signedMessage);
    if (recoveredAddress === connectedAccount) {
      const token = jwt.sign(
        { connectedAddess: connectedAccount },
        process.env.JWT_SEC_KEY,
      );
      res.status(201).json({ message: 'Login success.', token });
    } else {
      res.status(422).json({ message: 'Login failed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ error });
  }
};
module.exports = loginUser;
