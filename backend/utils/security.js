const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.accessTokenExpiration,
  });
};

module.exports = { generateAccessToken };
