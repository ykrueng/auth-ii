const jwt = require("jsonwebtoken");

const secret = 'Regex is not for human.';
const options = {
  expiresIn: '1h',
  jwtid: '12345' //jti
};

const generateToken = (objId) => jwt.sign(objId, secret, options);
const verifyToken = (token) => (
  jwt.verify(token, secret, (err, decoded) => {
    return !err;
  }
))

module.exports = {
  generateToken,
  verifyToken
}