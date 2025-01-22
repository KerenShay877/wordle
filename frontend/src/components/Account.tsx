import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AccountContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1a1a1b;
  border-radius: 12px;
  border: 2px solid #538d4e;
`;

const Title = styled.h2`
  color: #538d4e;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #2a2a2b;
  border-radius: 8px;
`;

const SectionTitle = styled.h3`
  color: #b59f3b;
  margin-bottom: 1rem;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatCard = styled.div`
  background-color: #1a1a1b;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #538d4e;
`;

const StatLabel = styled.div`
  color: #818384;
  font-size: 0.9rem;
`;

const Button = styled.button`
  background-color: #538d4e;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #437c3e;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff4444;
  &:hover {
    background-color: #cc3333;
  }
`;

interface UserStats {
  username: string;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  averageAttempts: number;
  bestStreak: number;
  currentStreak: number;
}

const Account: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/user/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserStats(data);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Add delete account logic here
    }
  };

  if (!userStats) {
    return <div>Loading...</div>;
  }

  return (
    <AccountContainer>
      <Title>Account Settings</Title>

      <Section>
        <SectionTitle>Profile Information</SectionTitle>
        <p>Username: {userStats.username}</p>
        <Button onClick={() => navigate("/change-password")}>
          Change Password
        </Button>
      </Section>

      <Section>
        <SectionTitle>Game Statistics</SectionTitle>
        <StatGrid>
          <StatCard>
            <StatValue>{userStats.gamesPlayed}</StatValue>
            <StatLabel>Games Played</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userStats.winRate}%</StatValue>
            <StatLabel>Win Rate</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userStats.currentStreak}</StatValue>
            <StatLabel>Current Streak</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userStats.bestStreak}</StatValue>
            <StatLabel>Best Streak</StatLabel>
          </StatCard>
        </StatGrid>
      </Section>

      <Section>
        <SectionTitle>Account Management</SectionTitle>
        <DeleteButton onClick={handleDeleteAccount}>
          Delete Account
        </DeleteButton>
      </Section>
    </AccountContainer>
  );
};

export default Account;
