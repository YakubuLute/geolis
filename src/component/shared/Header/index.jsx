import React, { useState } from "react";
import { useEffect } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Link } from "react-router-dom";

function Header() {
  useEffect(() => {
    const header = document.querySelector("[data-header]");
    window.addEventListener("scroll", function () {
      window.scrollY >= 400
        ? header.classList.add("active")
        : header.classList.remove("active");
    });
    return () => {
      window.removeEventListener("scroll", function () {
        window.scrollY >= 400
          ? header.classList.add("active")
          : header.classList.remove("active");
      });
    };
  }, []);



  return(
    <header className="header" data-header>
    <div className="overlay" data-overlay></div>
    <div className="header-top">
      <div className="container">
        <ul className="header-top-list">
          <li>
            <Link to="mailto:info@rento.com" className="header-top-link">
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
          <Link to={"/auth"} className="header-top-btn">
            Add Listing
          </Link>
        </div>
      </div>
    </div>

    <div className="header-bottom">
      <div className="container">
        <Link to="/" className="logo">
          <h1 className="h1">
            GEO
            <span>LIS</span>
          </h1>
        </Link>
        <nav className="navbar" data-navbar>
          <div className="navbar-top">
            <Link to="/" className="logo">
              <h1 className="h1">
                GEO
                <span>LIS</span>
              </h1>
            </Link>

            <button
              className="nav-close-btn"
              data-nav-close-btn
              aria-label="Close Menu"
            >
              <CloseOutlinedIcon className="icon" />
            </button>
          </div>

          <div className="navbar-bottom">
            <ul className="navbar-list">
              <li>
                <Link 
                  to="/land-listing"
                  className="navbar-link"
                  data-nav-link
                >
                  Land Listing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="navbar-link" data-nav-link>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="navbar-link" data-nav-link>
                  FAQS
                </Link>
              </li>
         
            </ul>
          </div>
        </nav>

        <div className="header-bottom-actions">
          <button className="nav-actions-btn" aria-label="Search" title="Search for a land">
           <Link to={"/advance-search"}> <SearchOutlinedIcon className="icon" />
            <span>Search</span></Link>
          </button>

          <button className="nav-actions-btn" aria-label="Profile" title="Dashboard">
            <a href="/auth">
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </a>
          </button>
          <button
            className="nav-actions-btn"
            data-nav-open-btn
            aria-label="Open Menu"
      
          >
            <MenuOutlinedIcon className="icon" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </div>
  </header>)
}
export default Header;
