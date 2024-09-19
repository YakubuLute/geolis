import React from "react";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <h1 className="h1">
                <span style={{ color: "white" }}> GEO</span>
                <span>LIS</span>
              </h1>
            </Link>

            <p className="section-text">
              Geolis is working towards an efficient and hustle free land search
              experience in Techiman, Bono East - Ghana. We provide
              comprehensive information and support about land, and land
              acquisition guidelines.
            </p>

            <ul className="contact-list">
              <li className="contact-link">
                <LocationOnOutlinedIcon />
                <address>Techiman, Bono East, Ghana</address>
              </li>

              <li>
                <a href="tel:+233542839173" className="contact-link">
                  <CallOutlinedIcon />
                  <span>+233 55 901 8865</span>
                </a>
              </li>

              <li>
                <a href="mailto:info@geolis.com" className="contact-link">
                  <EmailOutlinedIcon />

                  <span>info@geolis.com</span>
                </a>
              </li>
            </ul>

            <ul className="social-list">
              <li>
                <a
                  href="fb.com"
                  rel="noopener noreferer"
                  className="social-link"
                >
                  <FacebookOutlinedIcon />
                </a>
              </li>

              <li>
                <a
                  href="twitter.com/"
                  rel="noopener noreferer"
                  className="social-link"
                >
                  <TwitterIcon />
                </a>
              </li>

              <li>
                <a
                  href="linkedin.com"
                  rel="noopener noreferer"
                  className="social-link"
                >
                  <LinkedInIcon />
                </a>
              </li>

              <li>
                <a
                  href="youtube.com"
                  rel="noopener noreferer"
                  className="social-link"
                >
                  <YouTubeIcon />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-link-box">
            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Company</p>
              </li>

              <li>
                <a href="/about-us" className="footer-link">
                  About Geolis
                </a>
              </li>
              {/* <li>
                <a href="/faqs" className="footer-link">
                  Geolis FAQS
                </a>
              </li> */}

              <li>
                <a href="/contact" className="footer-link">
                  Contact Us
                </a>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Services</p>
              </li>

              <li>
                <a href="/auth" className="footer-link">
                  Register an Account / Login
                </a>
              </li>

              <li>
                <a href="/dashboard" className="footer-link">
                  My Geolis Dashboard
                </a>
              </li>

             
            </ul>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            <a href="/" rel="noreferrer noopener">
              {" "}
              &copy; {year} Geolis. All Rights Reserved
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
