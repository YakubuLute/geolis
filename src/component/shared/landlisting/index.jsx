import React from "react";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Property_1 from "../../../Assets/Images/General/land_1.jpg";
import Avatar from "../../../Assets/Images/General/avatar.png";
import HouseIcon from "@mui/icons-material/House";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";

import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import { Box, Divider, Stack } from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

function ListingComponent({ listingData }) {
  return (
    <Box className="landlisting-component-section" id="property">
      <section className="main_content">
        <ul className="landlisting-items">
          {listingData &&
            listingData.map((data) => {
              return (
                <li key={data.id} >
                  <div className="property-card">
                    <figure className="card-banner">
                      <Link to="/property-listing/property-details/">
                        <img
                          src={Property_1}
                          alt={data.name}
                          className="w-100"
                        />
                      </Link>

                      <div className="card-badge green">
                        <Link
                          style={{ color: "unset" }}
                          to={`/landdetails/${data.id}`}
                        >
                          Learn More
                        </Link>
                      </div>
                      <div className="banner-actions">
                        <button className="banner-actions-btn">
                          <LocationOnOutlinedIcon />
                          <address>{data.address}</address>
                        </button>

                        <button className="banner-actions-btn">
                          <PhotoLibraryOutlinedIcon />
                          <span>4</span>
                        </button>

                        <button className="banner-actions-btn">
                          <MovieFilterOutlinedIcon />

                          <span>2</span>
                        </button>
                      </div>
                    </figure>

                    <div className="card-content">
                      <h3 className="h3 card-title">
                        <Link
                          style={{ textTransform: "capitalize" }}
                          to={`/landdetaials/${data.id}`}
                        >
                          {data.name}
                        </Link>
                      </h3>

                      <p className="card-text">{data.description}</p>

                      <ul className="card-list">
                        <li className="card-item">
                          <strong>{data.zoning}</strong>
                          <HouseIcon />

                          <span>Zoning</span>
                        </li>

                        <li className="card-item">
                          <strong>{data.gps}</strong>

                          <GpsFixedIcon />

                          <span>GPS</span>
                        </li>

                        <li className="card-item">
                          <strong>{data.square_feet}</strong>

                          <SquareFootOutlinedIcon />
                          <span>Square Ft</span>
                        </li>
                      </ul>
                    </div>

                    <div className="card-footer">
                      <div className="card-author">
                        <figure className="author-avatar">
                          <img
                            src={Avatar}
                            alt="Admin Avatar"
                            className="w-100"
                          />
                        </figure>

                        <div>
                          <p className="author-name">
                            <Link to="#">MADAH WIISIKANDE SAAQIB</Link>
                          </p>

                          <p className="author-title">Estate Agents</p>
                        </div>
                      </div>

                      <div className="card-footer-actions">
                        <button className="card-footer-actions-btn">
                          <FavoriteBorderOutlinedIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>
    </Box>
  );
}

export default ListingComponent;
