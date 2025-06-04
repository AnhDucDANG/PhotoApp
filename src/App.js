 import "./App.css";

import React from "react";
import { Grid, Paper } from "@mui/material";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./components/Home/Login";
import Home from "./components/Home/Home";
const App = (props) => {
  const isLoggedIn = localStorage.getItem("authToken") === "valid-token";
  return (
    <Router>
      <div>
        {/* <Grid container spacing={3}> */}
          <Grid item xs={12}>
            <TopBar />
          </Grid>
          
          <div className="main-topbar-buffer" />
        {isLoggedIn?(
          <Grid container spacing={12}>
          <Grid item sm={4}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={8}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/photos" element={<UserPhotos />} />
                {/* <Route element={<ProtectedRoute />}> */}
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos" element={<UserPhotos />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route path="/users" element={<UserList />} />
                {/* </Route> */}
              </Routes>
            </Paper>
          </Grid>
          </Grid>
          
        ):(
          // Giao diện đơn giản khi chưa đăng nhập
            
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          
            {/* Các route bảo vệ vẫn cần để nếu người dùng cố gắng vào URL */}
            <Route element={<ProtectedRoute />}>
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/photos" element={<UserPhotos />} />
              <Route path="/photos/:userId" element={<UserPhotos />} />
              <Route path="/users" element={<UserList />} />
            </Route>
          </Routes>
          
        )}
        {/* </Grid> */}
        </div>
      
    </Router>
  );
};

export default App;
