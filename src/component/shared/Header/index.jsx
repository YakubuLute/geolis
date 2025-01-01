import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFireStoreContext } from '../../../context/FireStoreContext';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import {
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar
} from '@mui/material';

function Header() {
  const { userProfile } = useFireStoreContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const header = document.querySelector("[data-header]");
    const handleScroll = () => {
      window.scrollY >= 400
        ? header.classList.add("active")
        : header.classList.remove("active");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const menuItems = [
    { text: 'Land Listing', link: '/land-listing' },
    { text: 'Contact', link: '/contact' },
  ];

  const drawer = (
    <div>
      <div className="navbar-top">
        <Link to="/" className="logo" onClick={handleDrawerClose}>
          <h1 className="h1">
            GEO<span>LIS</span>
          </h1>
        </Link>
        <IconButton onClick={handleDrawerClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.link} onClick={handleDrawerClose}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <header className="header" data-header>
      <div className="overlay" data-overlay></div>
      <div className="header-top">
        <div className="container">
          <ul className="header-top-list">
            <li>
              <Link to="mailto:info@geolis.com" className="header-top-link">
                <MailOutlineIcon className="icon" />
                <span>info@geolis.com</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="header-top-link">
                <SupportAgentOutlinedIcon className="icon" />
                <span>Support: +233 55 901 8865</span>
              </Link>
            </li>
          </ul>

          <div className="wrapper">
            <Link to={"/dashboard/land"} className="header-top-btn">
              Add Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <Link to="/" className="logo">
            <h1 className="h1">
              GEO<span>LIS</span>
            </h1>
          </Link>
          {!isMobile && (
            <nav className="navbar" data-navbar>
              <div className="navbar-bottom">
                <ul className="navbar-list">
                  {menuItems.map((item) => (
                    <li key={item.text}>
                      <Link
                        to={item.link}
                        className="navbar-link"
                        data-nav-link
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}

          <div className="header-bottom-actions">
            <button
              className="nav-actions-bt"
              aria-label="Profile"
              title="Dashboard"
            >
              <Link to="/dashboard" className="icon">
                <Avatar
                  src={userProfile?.photoURL}
                  alt={userProfile?.displayName}
                  sx={{
                    width: 36,
                    height: 36,
                    border: (theme) =>
                      `solid 2px ${theme.palette.background.default}`,
                  }}
                >
                  {userProfile?.displayName?.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            </button>
            {isMobile && (
              <button
                className="nav-actions-btn"
                data-nav-open-btn
                aria-label="Open Menu"
                onClick={handleNavClick}
              >
                <MenuOutlinedIcon className="icon" />
                <span>Menu</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          {drawer}
        </Drawer>
      )}
    </header>
  );
}

export default Header;