const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const authRoutes = require("./api/auth");
const gameRoutes = require("./api/game");
const userRoutes = require("./api/user");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
app.use("/user", userRoutes);

// Connect to MongoDB
mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
