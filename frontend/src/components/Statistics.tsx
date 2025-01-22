import React, { useEffect, useState } from "react";
import { useWordle } from "../hooks/useWordle";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StatsContainer = styled.div`
  padding: 20px;
  color: white;
  max-width: 600px;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  background-color: #1a1a1b;
  border-radius: 12px;
  border: 2px solid #538d4e;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #538d4e, #b59f3b, #538d4e);
  }
`;

const Username = styled.h1`
  color: #ffffff;
  margin-bottom: 15px;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  span {
    color: #538d4e;
    font-style: italic;
  }
`;

const UserStats = styled.div`
  font-size: 0.9rem;
  color: #818384;
  font-style: italic;
`;

const StatsHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const GameHistoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const GameCard = styled.div`
  background-color: #1a1a1b;
  border: 1px solid #3a3a3c;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const StatsButton = styled.button`
  background-color: #538d4e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;

  &:hover {
    background-color: #437c3e;
  }
`;

const NoGamesMessage = styled.p`
  text-align: center;
  color: #818384;
`;

const Statistics: React.FC = () => {
  const navigate = useNavigate();
  const { fetchGameHistory, gameHistory } = useWordle("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8000/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        }
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUserInfo();
    fetchGameHistory();
  }, [fetchGameHistory, navigate]);

  const handleClose = () => {
    navigate("/");
  };

  // Calculate statistics
  const totalGames = gameHistory.length;
  const gamesWon = gameHistory.filter((game) => game.isWon).length;
  const winRate =
    totalGames > 0 ? ((gamesWon / totalGames) * 100).toFixed(1) : "0";

  return (
    <StatsContainer>
      <UserInfo>
        <Username>
          {username}
          <span>'s Statistics</span>
        </Username>
        <UserStats>
          Total Games: {totalGames}
          <br />
          Games Won: {gamesWon}
          <br />
          Win Rate: {winRate}%
        </UserStats>
      </UserInfo>

      {/* Summary Section */}
      <GameCard>
        <p>Total Games: {totalGames}</p>
        <p>Games Won: {gamesWon}</p>
        <p>Win Rate: {winRate}%</p>
      </GameCard>

      {/* Game History */}
      <StatsHeader>Game History</StatsHeader>
      <GameHistoryContainer>
        {gameHistory.length > 0 ? (
          gameHistory.map((game, index) => (
            <GameCard key={index}>
              <p>Word: {game.secretWord}</p>
              <p>Attempts: {game.attempts}/6</p>
              <p>Result: {game.isWon ? "Won! ��" : "Lost 😢"}</p>
              <p>Played: {new Date(game.createdAt).toLocaleDateString()}</p>
            </GameCard>
          ))
        ) : (
          <NoGamesMessage>No games played yet</NoGamesMessage>
        )}
      </GameHistoryContainer>

      <StatsButton onClick={handleClose}>Back to Game</StatsButton>
    </StatsContainer>
  );
};

export default Statistics;
