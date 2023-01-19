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
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import "./Navbar.scss";
import "./Links";
import { drawerList, Links } from "./Links";
import { Link } from "react-router-dom";
import { LoginPopup } from "./LoginPopup";
import { signOut } from "../UserAuth/AuthUtils";
import { GetCurrentUserByEmail } from "../UserAuth/FetchUserInfo";
import { Storage } from "aws-amplify";
import { useLocation } from "react-router-dom";

const getNavbarAvatar = async (setAvatar, setHasLoaded) => {
  var AvatarKey;
  await GetCurrentUserByEmail().then((userValue) => {
    userValue.map((items) => {
      AvatarKey = items.avatar;
    });
  });
  await Storage.get(AvatarKey).then((avatarValue) => {
    setAvatar(avatarValue);
  });
  setHasLoaded(true);
};

export const Navbar = (props) => {
  const [open, setDrawer] = useState(false);
  const [displayPopup, setDisplay] = useState(false);
  const [hasLoadead, setHasLoaded] = useState(false);
  const [avatar, setAvatar] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Id, setId] = useState();
  const openMenu = Boolean(anchorEl);

  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawer(!open);
  };
  const toggleDisplay = () => {
    setDisplay(!displayPopup);
  };
  if (props.auth) getNavbarAvatar(setAvatar, setHasLoaded);
  return (
    <>
      <AppBar
        color={
          location.pathname === "/"
            ? "transparent"
            : location.pathname === "/home"
            ? "transparent"
            : "primary"
        }
        sx={{ mb: 200, filter: "blur(50%)" }}
      >
        <Toolbar>
          <IconButton>
            <img src={logo} className="logo" alt="logo"></img>
          </IconButton>
          <ul className="nav-menu">
            {Links.map((item, idx) => {
              return (
                <Button variant="text" key={idx} className={item.cName}>
                  <Link
                    style={{ textDecoration: "none" }}
                    className={item.cName}
                    to={item.url}
                    key={idx}
                  >
                    <li key={idx}>
                      <Typography
                        color={
                          location.pathname === "/"
                            ? null
                            : location.pathname === "/home"
                            ? null
                            : "inherit"
                        }
                        fontWeight={500}
                      >
                        {item.title}
                      </Typography>
                    </li>
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
            <>
              <IconButton onClick={handleClick}>
                <Avatar src={avatar} alt="" className="avatar"></Avatar>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={"/profile"}
                  >
                    Manage account
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose && signOut}>Logout</MenuItem>
              </Menu>
            </>
          )}
          <IconButton color="inherit" size="small" onClick={toggleDrawer}>
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
              <Box className="drawer" color="primary.main">
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
