import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      localStorage.setItem("authToken", "valid-token");
      navigate("/users");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    <Box className="login-page">
      <Paper className="login-box" elevation={8}>
        <Typography variant="h5" className="login-title" gutterBottom>
          Đăng nhập
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Tên đăng nhập"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Mật khẩu"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            fontWeight: "bold",
            background: "#1976d2",
            "&:hover": {
              background: "#155fa0",
            },
          }}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
