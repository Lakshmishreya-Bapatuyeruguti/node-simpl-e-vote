const jwt = require('jsonwebtoken');

async function jwtAuthMiddleware(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'ACCESS DENIED' });
  }
  try {
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format.' });
    }
    token = tokenParts[1];
    const userInfo = jwt.verify(token, process.env.JWT_SEC_KEY);
    console.log(userInfo);
    req.user = userInfo;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not Authorized' });
  }
}
module.exports = jwtAuthMiddleware;
