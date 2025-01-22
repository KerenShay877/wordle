import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1a1a1b;
  border-radius: 12px;
  border: 2px solid #538d4e;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #3a3a3c;
  background-color: #2a2a2b;
  color: white;

  &:focus {
    outline: none;
    border-color: #538d4e;
  }
`;

const Button = styled.button`
  background-color: #538d4e;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #437c3e;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  margin: 0.5rem 0;
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.accessToken);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <RegisterContainer>
      <h2>Create Account</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Register</Button>
      </Form>
    </RegisterContainer>
  );
};

export default Register;
