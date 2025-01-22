import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const HeaderContainer = styled.header`
  background-color: #1a1a1b;
  border-bottom: 2px solid #3a3a3c;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  gap: 2rem;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  color: #538d4e;
  text-decoration: none;
  letter-spacing: 2px;
  text-transform: uppercase;

  &:hover {
    text-shadow: 0 0 8px rgba(83, 141, 78, 0.6);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${(props) => (props.$active ? "#538d4e" : "white")};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  font-weight: ${(props) => (props.$active ? "600" : "400")};

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.$active ? "100%" : "0")};
    height: 2px;
    background-color: #538d4e;
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: rgba(83, 141, 78, 0.1);
    &::after {
      width: 100%;
    }
  }
`;

const NavButton = styled.button`
  background-color: #538d4e;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #437c3e;
  }
`;

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status whenever location changes
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // Re-check when path changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <HeaderContainer>
      <NavContent>
        <Logo to="/">Wordle</Logo>
        <Nav>
          <NavLink to="/" $active={isActive("/")}>
            Play
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/stats" $active={isActive("/stats")}>
                Statistics
              </NavLink>
              <NavLink to="/leaderboard" $active={isActive("/leaderboard")}>
                Leaderboard
              </NavLink>
              <NavLink to="/account" $active={isActive("/account")}>
                Profile
              </NavLink>
              <NavButton onClick={handleLogout}>Logout</NavButton>
            </>
          ) : (
            <>
              <NavLink to="/login" $active={isActive("/login")}>
                Login
              </NavLink>
              <NavLink to="/register" $active={isActive("/register")}>
                Register
              </NavLink>
            </>
          )}
        </Nav>
      </NavContent>
    </HeaderContainer>
  );
};

export default Header;
