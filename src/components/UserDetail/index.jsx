import React from "react";
import {Typography} from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
import { useEffect } from "react";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    const userInfo = models.userModel(user.userId);
    useEffect(()=>{
      if(userInfo){
        console.log(userInfo);
      }
    }, [userInfo]);
    return (
        <>
          <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: {user.userId}.
            You can fetch the model for the user from models.userModel.
          </Typography>
          {userInfo && (
            <div>
              {Object.entries(userInfo).map(([key, value])=>(
                <Typography key={key} variant="body2">
                  {key}: {value}
                </Typography>
              ))}
            </div>
          )}

        </>
    );
}

export default UserDetail;
