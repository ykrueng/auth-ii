require('dotenv').config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const options = {
  expiresIn: "1h",
  jwtid: "12345" //jti
};

const generateToken = objId => jwt.sign(objId, secret, options);

const verifyToken = token =>
  jwt.verify(token, secret, (err, decoded) => {
    return !err;
  });

const decodeToken = token => jwt.decode(token);

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};
