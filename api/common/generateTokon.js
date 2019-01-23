const jwt = require("jsonwebtoken");

module.exports = ({ id }) => {
  const payload = {
    id 
  };
  const secret = 'Regex is not for human.';
  const options = {
    expiresIn: '1h',
    jwtid: '12345' //jti
  };

  return jwt.sign(payload, secret, options);
}