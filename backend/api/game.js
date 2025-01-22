const express = require("express");
const router = express.Router();
const GameHistory = require("../models/GameHistory");
const { authenticateToken } = require("../middleware/authMiddleware");
const words = require("../utils/wordList");

// Cleanup function with forced deletion
const cleanupOldGames = async () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    // Force delete all games older than one week
    const result = await GameHistory.deleteMany({
      createdAt: { $lt: oneWeekAgo },
    });

    if (result.deletedCount > 0) {
      console.log(`Cleaned up ${result.deletedCount} old games`);
    }
  } catch (error) {
    console.error("Error cleaning up old games:", error);
  }
};

// Save game route
router.post("/save_game", authenticateToken, async (req, res) => {
  try {
    const { secretWord, attempts, timeTaken, isWon } = req.body;
    const game = new GameHistory({
      userId: req.user.userId,
      secretWord,
      attempts,
      timeTaken,
      isWon,
    });
    await game.save();
    res.status(201).json({ message: "Game saved successfully" });
  } catch (error) {
    console.error("Error saving game:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get user games route
router.get("/get_user_games", authenticateToken, async (req, res) => {
  try {
    // Run cleanup first
    await cleanupOldGames();

    // Fetch only games from the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const games = await GameHistory.find({
      userId: req.user.userId,
      createdAt: { $gte: oneWeekAgo },
    }).sort({ createdAt: -1 });

    // Double-check dates before sending
    const filteredGames = games.filter((game) => {
      const gameDate = new Date(game.createdAt);
      return gameDate >= oneWeekAgo;
    });

    res.json(filteredGames);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/random-word", async (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    res.json({ word });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
