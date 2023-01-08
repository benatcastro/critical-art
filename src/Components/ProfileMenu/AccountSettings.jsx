import { Avatar, Typography } from "@mui/material";
import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import {
  deleteUser,
  GetCurrentUser,
  GetCurrentUserEmail,
  GetCurrentUserInfo,
  GetUserByEmail,
  listUsers,
} from "../UserAuth/FetchUserInfo";
import "./AccountSettings.scss";

export const AccountSettings = () => {
  const userData = GetCurrentUserInfo().userInfo;
  console.log("UserData:", userData);
  return (
    <div className="account-settings-container">
      <Typography style={{ textAlign: "center" }}>
        Edit your profile settings
      </Typography>
      <div className="avatar-container">
        <Avatar sx={{ bgColor: "secondary.dark" }}></Avatar>
      </div>
      <div className="user-info-container">
        {userData.map((item, idx) => {
          return (
            <div>
              <p>{item.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
