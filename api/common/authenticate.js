const { verifyToken } = require("./token");

module.exports = (req, res, next) => {
  const { token } = req.body;

  if (!token || !verifyToken(token)) {
    res.status(401).send('You shall not pass!');
  } else {
    next();
  }
}