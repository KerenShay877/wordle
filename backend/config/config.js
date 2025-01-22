require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || "30m",
};
