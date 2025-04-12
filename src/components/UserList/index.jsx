import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom"; 
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const users = models.userListModel();
    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography>
        {/* <List component="nav">
          {users.map((item) => (
            <>
              <ListItem>
                      <ListItemText primary={item.first_name}/>
              </ListItem>
              <Divider />
            </>
          ))}
        </List> */}
        <List component="nav">
        {users.map((item) => (
          <div key={item._id}>
            <ListItem button>
              {/* Wrap the user's name in a Link component */}
              <Link to={`/users/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </Link>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
        <Typography variant="body1">
          The model comes in from models.userListModel()
        </Typography>
      </div>
    );
}

export default UserList;
