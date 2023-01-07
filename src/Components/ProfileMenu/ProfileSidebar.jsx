import React from "react";
import "./Sidebar.scss";
import { IconButton, Box, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ImageIcon from "@mui/icons-material/Image";
import UploadIcon from "@mui/icons-material/Upload";


export const ProfileSidebar = (setScroll) => {
  return (
    <Box className="settings-container" sx={{backgroundColor: "primary.light"}}>
      <div className="account-settings" onClick={() => setScroll('account-settings-section')}>
        <IconButton>
          <SettingsIcon
            sx={{ color: "white", fontSize: "4rem" }}
            className="account-icon"
          />
        </IconButton>
      </div>
      <div className="image-settings" onClick={() => setScroll('image-settings-section')}>
        <IconButton>
          <ImageIcon
            sx={{ color: "white", fontSize: "4rem" }}
            className="image-icon"
          />
        </IconButton>
      </div>
      <div className="upload-images" onClick={() => setScroll('upload-image-section')}>
        <IconButton>
          <UploadIcon
            sx={{ color: "white", fontSize: "4rem" }}
            className="upload-icon"
          />
        </IconButton>
      </div>
    </Box>
  );
};
