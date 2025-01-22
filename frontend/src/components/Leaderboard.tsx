import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1a1a1b;
  border-radius: 12px;
  border: 2px solid #538d4e;
`;

const Title = styled.h2`
  color: #538d4e;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #3a3a3c;
  color: #b59f3b;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #3a3a3c;
`;

const Tr = styled.tr`
  &:hover {
    background-color: rgba(83, 141, 78, 0.1);
  }
`;

const Medal = styled.span`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

interface LeaderboardEntry {
  username: string;
  gamesWon: number;
  totalGames: number;
  winRate: number;
  averageAttempts: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:8000/game/leaderboard');
        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedal = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LeaderboardContainer>
      <Title>Global Leaderboard</Title>
      <Table>
        <thead>
          <tr>
            <Th>Rank</Th>
            <Th>Player</Th>
            <Th>Games Won</Th>
            <Th>Win Rate</Th>
            <Th>Avg. Attempts</Th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <Tr key={entry.username}>
              <Td>
                <Medal>{getMedal(index)}</Medal>
                {index + 1}
              </Td>
              <Td>{entry.username}</Td>
              <Td>{entry.gamesWon}</Td>
              <Td>{entry.winRate.toFixed(1)}%</Td>
              <Td>{entry.averageAttempts.toFixed(1)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
