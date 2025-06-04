import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Photo Sharing App</h1>
      <p className="home-subtitle">
        A modern platform to explore and share your beautiful moments with the world.
      </p>
      <button className="home-button" onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
};

export default Home;
