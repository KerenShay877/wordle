import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Login from "./components/Login";
import Help from "./components/Help";
import Leaderboard from "./components/Leaderboard";
import Account from "./components/Account";
import Header from "./components/Header";
import styled from "styled-components";
import Statistics from "./components/Statistics";
import Register from "./components/Register";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Game />} />
            <Route path="/help" element={<Help />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/stats" element={<Statistics />} />
          </Routes>
        </MainContent>
        <Footer>&copy; {new Date().getFullYear()} Wordle Game made by Keren Shay </Footer>
      </AppContainer>
    </Router>
  );
}

export default App;
