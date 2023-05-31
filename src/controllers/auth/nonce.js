const crypto = require('crypto');
const userNonce = async (req, res) => {
  try {
    const nonce = crypto.randomBytes(32).toString('hex');
    // const { connectedAccount } = req.body;
    // if (connectedAccount) {
    //   const token = jwt.sign(
    //     { connectedAddess: connectedAccount },
    //     process.env.JWT_SEC_KEY,
    //   );
    console.log(nonce, '..................');
    res.status(201).json({ nonce });
    // }
    // else {
    //   res.status(422).json({ message: 'Login failed.' });
    // }
  } catch (error) {
    console.error(error);
    res.status(422).json({ error });
  }
};
module.exports = userNonce;
