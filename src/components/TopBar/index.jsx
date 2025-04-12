import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import { useLocation } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
  const location = useLocation(); // Lấy thông tin URL
  const userId = location.pathname.split('/')[2]; // Lấy userId từ URL (nếu có)

  let title = "Photo Sharing App"; // Tiêu đề mặc định

  // Kiểm tra xem chúng ta có đang ở trang userDetail hoặc userPhotos không
  if (userId) {
    const user = models.userModel(userId); // Dùng userModel để lấy thông tin người dùng
    if (user) {
      title = location.pathname.includes("/photos") ? `Photos of ${user.first_name} ${user.last_name}` : `${user.first_name} ${user.last_name}`;
    }
  }

  return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            This is the TopBar component
          </Typography>

         
          

        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
