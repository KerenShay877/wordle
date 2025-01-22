const express = require("express");
const router = express.Router();
const User = require("../models/User");
const GameHistory = require("../models/GameHistory");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/stats", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all user's games
    const games = await GameHistory.find({ userId: req.user.userId });

    // Calculate statistics
    const gamesPlayed = games.length;
    const gamesWon = games.filter((game) => game.isWon).length;
    const winRate = gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0;

    // Calculate streaks
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;

    // Sort games by date
    const sortedGames = games.sort((a, b) => b.createdAt - a.createdAt);

    sortedGames.forEach((game) => {
      if (game.isWon) {
        tempStreak++;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    // Current streak is the first sequence of wins
    for (const game of sortedGames) {
      if (game.isWon) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate average attempts for won games
    const wonGames = games.filter((game) => game.isWon);
    const averageAttempts =
      wonGames.length > 0
        ? wonGames.reduce((sum, game) => sum + game.attempts, 0) /
          wonGames.length
        : 0;

    res.json({
      username: user.username,
      gamesPlayed,
      gamesWon,
      winRate,
      averageAttempts,
      currentStreak,
      bestStreak,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
