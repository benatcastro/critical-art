import React from "react";
import "./Sidebar.scss";
import { IconButton, Box, Typography, AppBar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ImageIcon from "@mui/icons-material/Image";
import UploadIcon from "@mui/icons-material/Upload";

export const ProfileSidebar = (props) => {
  return (
    <Box className="settings-container" sx={{backgroundColor: "primary.main"}}>
      <Box className="account-settings" component="div" sx={{backgroundColor: 'secondary.dark'}} onClick={() => props.handleScroll('account-settings-section')}>
        <IconButton>
          <SettingsIcon
            sx={{ color: "white", fontSize: "4rem" }}
            className="account-icon"
          />
        </IconButton>
      </Box>
      <Box className="image-settings" sx={{backgroundColor: 'secondary.dark'}} onClick={() => props.handleScroll('image-settings-section')}>
        <IconButton>
          <ImageIcon
            sx={{ color: "white", fontSize: "4rem" }}
            className="image-icon"
          />
        </IconButton>
      </Box>
      <Box className="upload-images" sx={{backgroundColor: 'secondary.dark'}} onClick={() => props.handleScroll('upload-image-section')}>
        <IconButton>
          <UploadIcon
            sx={{ color: "white", fontSize: "4rem" }}
            className="upload-icon"
          />
        </IconButton>
      </Box>
    </Box>
  );
};
