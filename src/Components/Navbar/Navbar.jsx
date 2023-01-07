import React, { useState } from "react";
import logo from "../../Logos/logo_black.svg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  Box,
} from "@mui/material";
import "./Navbar.scss";
import "./Links";
import { drawerList, Links } from "./Links";
import { Link } from "react-router-dom";
import { LoginPopup } from "./LoginPopup";
import {signOut} from "../UserAuth/AuthUtils"

export const Navbar = (props) => {
  const [open, setDrawer] = useState(false);
  const [displayPopup, setDisplay] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!open);
  };
  console.log("Navbar auth:", props.auth);
  const toggleDisplay = () => {
    setDisplay(!displayPopup);
  };

  console.log("Drawer:", open);
  return (
    <>
      <AppBar className="appbar">
        <Toolbar>
          <IconButton>
            <Link to={"/"}>
              <img src={logo} className="logo" alt="logo"></img>
            </Link>
          </IconButton>
          <ul className="nav-menu">
            {Links.map((item, idx) => {
              return (
                <Button variant="contained" key={idx}>
                  <Link
                    style={{ textDecoration: "none" }}
                    className={item.cName}
                    to={item.url}
                    key={idx}
                  >
                    <li key={idx}>{item.title}</li>
                  </Link>
                </Button>
              );
            })}
          </ul>
          {!props.auth ? (
            <Button
              color="secondary"
              variant="contained"
              size="large"
              className="login-btn"
              onClick={toggleDisplay}
            >
              Login
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              size="large"
              className="login-btn"
              onClick={signOut}
            >
              Log out
            </Button>
          )}
          <IconButton
            color="inherit"
			size="small"
            onClick={toggleDrawer}
            className="drawer-btn"
          >
            <MenuIcon sx={{ fontSize: "2.5rem" }} className="drawer-btn" />
          </IconButton>
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <Drawer anchor="right" open={open}>
              <Box className="drawer" color="primary">
                <IconButton
                  color="inherit"
                  onClick={toggleDrawer}
                  className="close-drawer"
                >
                  <CloseIcon
                    sx={{ fontSize: "2rem" }}
                    className="close-drawer"
                  />
                </IconButton>
              </Box>
              {drawerList}
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
      {displayPopup ? (
        <LoginPopup toggleDisplay={toggleDisplay} value={displayPopup} />
      ) : null}
    </>
  );
};
