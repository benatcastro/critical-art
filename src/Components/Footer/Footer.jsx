import {
  Box,
  IconButton,
  Typography,
  Divider,
  Grid,
  Toolbar,
  AppBar,
  Button,
  Icon,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Logos/logo_black.svg";
import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PestControlOutlinedIcon from "@mui/icons-material/PestControlOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';

export const Footer = () => {
  return (
    <Box
      width="100vw"
      sx={{
        backgroundColor: "primary.main",
      }}
      className="footer-container"
      component="div"
    >
      <div className="footer-logo">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="divider"></div>
      <div className="column">
        <Link className="link" to={"/"}>
          <Typography fontWeight={600} color="basics.white" className="text">
            Who we are
            <Icon className="icon">
              <Person2OutlinedIcon />
            </Icon>
          </Typography>
        </Link>
        <Link className="link" to={"/"}>
          <Typography fontWeight={600} color="basics.white" className="text">
            Donate
            <Icon className="icon">
              <VolunteerActivismOutlinedIcon />
            </Icon>
          </Typography>
        </Link>
        <Link className="link" to={"/"}>
          <Typography fontWeight={600} color="basics.white" className="text">
            Become a partner
            <Icon className="icon">
              <HandshakeOutlinedIcon />
            </Icon>
          </Typography>
        </Link>
      </div>
      <div className="divider"></div>
      <div className="column">
        <Link className="link" to={"/"}>
          <Typography fontWeight={600} color="basics.white" className="text">
            Contact us{" "}
            <Icon className="icon">
              <EmailOutlinedIcon />
            </Icon>
          </Typography>
        </Link>
        <Link className="link" to={"/"}>
          <Typography fontWeight={600} color="basics.white" className="text">
            Report a issue{" "}
            <Icon className="icon">
              <PestControlOutlinedIcon />
            </Icon>
          </Typography>
        </Link>
      </div>
      <div className="divider"></div>
      <div className="column">
        <Link className="link" to={"/"}>
          <Typography fontWeight={600} color="basics.white" className="twitter">
            <Icon>
              <TwitterIcon />
            </Icon>
          </Typography>
        </Link>
        <Link className="link" to={"/"}>
          <Typography fontWeight={600} color="basics.white" className="instagram">
            <Icon>
              <InstagramIcon />
            </Icon>
          </Typography>
        </Link>
      </div>
    </Box>
  );
};
