import React from "react";
import { Typography } from "@mui/material";
import {  Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import { useEffect } from "react";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const user = useParams();
  const userInfo = models.userModel(user.userId);
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
    }
  }, [userInfo]);
  return (
    <>
      <div className="user-detail-container">
        <Typography variant="body1">
          This should be the UserDetail view of the PhotoShare app. Since it is
          invoked from React Router the params from the route will be in
          property match. So this should show details of user: {user.userId}.
          You can fetch the model for the user from models.userModel.
        </Typography>
        <Typography className="user-detail-title">
          Thông tin chi tiết người dùng: {user.userId}
        </Typography>

        {/* avatar nguoi dung */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Avatar
            alt={`${userInfo.first_name} ${userInfo.last_name}`}
            src={`/images/${photo.file_name}`}
            sx={{ width: 100, height: 100 }}
          />
        </div> */}
        {/* avatar nguoi dung */}

        {userInfo && (
          <div>
            {Object.entries(userInfo).map(([key, value]) => (
              <Typography key={key} variant="body2">
                {key}: {value}
              </Typography>
            ))}
          </div>
        )}
        {/* Nút quay lại danh sách */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button
            component={Link}
            to="/users"
            variant="contained"
            color="primary"
          >
            Quay lại danh sách người dùng
          </Button>
          <Button variant="outlined" component={Link} to={`/photos/${user.userId}`}>
            Xem ảnh của người dùng
          </Button>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
