import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import "./Navbar.scss"
import { Link } from "react-router-dom";

export const Links = [
  {
    title: "Home",
    url: "/",
    cName: "nav-links",
  },
  {
    title: "About",
    url: "/about",
    cName: "nav-links",
  },
  {
    title: "Our Artists",
    url: "/artists",
    cName: "nav-links",
  },
  {
    title: "Help Us",
    url: "/donate",
    cName: "nav-links",
  },
  {
    title: "Contact Us",
    url: "/contact",
    cName: "nav-links",
  },
  {
    title: "Profile",
    url: "/profile",
    cName: "nav-links",
  },
];

export const drawerList = (
  <List className="drawer-list">
    <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link to="/about" style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        <ListItemText primary="About" />
      </ListItemButton>
    </Link>
    <Link to="/artists" style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        <ListItemText primary="Our Artists" />
      </ListItemButton>
    </Link>
    <Link to="/donate" style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        <ListItemText primary="Help Us" />
      </ListItemButton>
    </Link>
    <Link to={"/contact"} style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        <ListItemText primary="Contact Us" />
      </ListItemButton>
    </Link>
    <Link to={"/Profile"} style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
  </List>
);
