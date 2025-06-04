import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Box,
  Grid,
} from "@mui/material";

import models from "../../modelData/models";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const users = models.userListModel();
  const photos = userId ? models.photoOfUserModel(userId) : [];

  const selectedUser = users.find((u) => u._id === userId);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* <Grid container spacing={2}> */}
        {/* Cột trái: Danh sách người dùng */}
        <Grid item xs={12} md={3}>
          <div className="user-list-container">
            <Typography className="user-list-title">
              Danh sách người dùng
            </Typography>
            <List component="nav">
              {users.map((user) => (
                <div key={user._id}>
                  <ListItemButton selected={user._id === userId}>
                    <Link
                      to={`/photos/${user._id}`}
                      style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                    >
                      <ListItemText
                        primary={`${user.first_name} ${user.last_name}`}
                      />
                    </Link>
                  </ListItemButton>
                  <Divider className="user-divider" />
                </div>
              ))}
            </List>
          </div>
        </Grid>

        {/* Cột phải: Hiển thị ảnh và bình luận */}
        <Grid item xs={12} md={9}>
          {userId && selectedUser ? (
            <div>
              <Typography variant="h6" gutterBottom>
                Ảnh của {selectedUser.first_name} {selectedUser.last_name}
              </Typography>

              {photos.length === 0 ? (
                <Typography variant="body2">Không có ảnh nào.</Typography>
              ) : (
                photos.map((photo) => (
                  <Card key={photo._id} sx={{ marginBottom: 4 }}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={`/images/${photo.file_name}`}
                      alt="User photo"
                      sx={{ objectFit: 'contain', maxHeight: '500px' }}
                    />
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">
                        Tải lên lúc: {new Date(photo.date_time).toLocaleString()}
                      </Typography>

                      <Divider sx={{ my: 1 }} />

                      <Typography variant="subtitle1" fontWeight="bold">
                        Bình luận:
                      </Typography>

                      {photo.comments?.length > 0 ? (
                        photo.comments.map((comment) => (
                          <Box key={comment._id} sx={{ mt: 1 }}>
                            <Typography variant="body2" gutterBottom>
                              {new Date(comment.date_time).toLocaleString()} -{" "}
                              <Link to={`/users/${comment.user._id}`}>
                                {comment.user.first_name} {comment.user.last_name}
                              </Link>
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 2 }}>
                              {comment.comment}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Không có bình luận nào.
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          ) : (
            <Typography variant="body1">
              Hãy chọn một người dùng để xem ảnh và bình luận.
            </Typography>
          )}
        </Grid>
      {/* </Grid> */}
    </Box>
  );
}

export default UserPhotos;
