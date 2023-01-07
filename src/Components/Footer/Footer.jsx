import { Box, IconButton, Typography, Divider, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import logo from "../../Logos/logo_black.svg";
import "./Footer.scss";

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
      }}
	  className="footer-container"
      component="div"
    >
		<div className="footer-logo">
	  		<img className="logo" src={logo} alt="logo" />
		</div>
		<div className="footer-content">
		</div>
    </Box>
  );
};
