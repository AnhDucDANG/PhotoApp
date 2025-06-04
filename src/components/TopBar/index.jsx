import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import models from "../../modelData/models";

import UserDetail from "../UserDetail";
import "./styles.css";

import UserList from "../UserList";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation(); // Lấy thông tin URL
  const userId = location.pathname.split("/")[2]; // Lấy userId từ URL (nếu có)

  const isLoggedIn = localStorage.getItem("authToken") === "valid-token";
  const navigate = useNavigate()

  let title = "Photo Sharing App"; // Tiêu đề mặc định

  // Kiểm tra xem chúng ta có đang ở trang userDetail hoặc userPhotos không
  if (userId && isLoggedIn) {
    const user = models.userModel(userId); // Dùng userModel để lấy thông tin người dùng
    if (user) {
      title = location.pathname.includes("/photos")
        ? `Photo of ${user.first_name} ${user.last_name}`
        : `${user.first_name} ${user.last_name}`;
    }
  }

  
  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Đăng xuất: xóa token và chuyển về trang login
      localStorage.removeItem("authToken");
      navigate("/login");
    } else {
      // Chuyển tới trang login
      navigate("/login");
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ width: "50%", justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
           {title}
        </Typography>

        <nav  style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Typography
            component={Link}
            to="/"
            color="inherit"
            variant="h6"
            sx={{ textDecoration: "none", fontWeight: 500 }}
          >
            Home
          </Typography>

          {isLoggedIn && (
            <>
               <Typography
                component={Link}
                to="/users"
                color="inherit"
                variant="h6"
                sx={{ textDecoration: "none", fontWeight: 500 }}
              >
                UserList
              </Typography>

              <Typography
                component={Link}
                to="/photos"
                color="inherit"
                variant="h6"
                sx={{ textDecoration: "none", fontWeight: 500 }}
              >
                UserPhotos
              </Typography>

              {/* Link động mẫu để hiện nút khi userId đã được chọn */}
              {userId && (
                <Typography
                  component={Link}
                  to={`/users/${userId}`}
                  color="inherit"
                  variant="h6"
                  sx={{ textDecoration: "none", fontWeight: 500 }}
                >
                  UserDetail
                </Typography>
              )}
            </>
          )}
        </nav>
        <Button color="inherit" onClick={handleAuthClick}  sx={{ fontSize: "1rem", fontWeight: 500 }}>
          {isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
