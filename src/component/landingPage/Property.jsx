import React from 'react'
import { Link } from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Property_1 from "../../Assets/Images/General/land_1.jpg"

import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import { useUserProfile } from "../../context/UserContext"
import Skeleton from '@mui/material/Skeleton';
import EmptyField from './EmptyField';
function Property() {
    const { landData } = useUserProfile();
    console.log("Land information stored", landData)
    if (landData.length < 1) {
        <>
            <EmptyField fieldName='Featured Listings'/>
        </>
    }
    return (
        <section className="property" id="property">
            <div className="container">
                <p className="section-subtitle">Properties</p>

                <h2 className="h2 section-title">Featured Listings</h2>

                <ul className="property-list has-scrollbar">
                    {landData && landData.map((land, index) => {
                        return (<li>
                            <div className="property-card">
                                <figure className="card-banner">
                                    <Link to="/property-listing/property-details/">
                                        <img
                                            src={Property_1}
                                            alt="New Apartment Nice View"
                                            className="w-100"
                                        />
                                    </Link>

                                    <div className="card-badge green">For Sale</div>

                                    <div className="banner-actions">
                                        <button className="banner-actions-btn">
                                            < LocationOnOutlinedIcon />

                                            <address>{land.location}</address>
                                        </button>

                                        <button className="banner-actions-btn">
                                            <PhotoLibraryOutlinedIcon />

                                            <span>4</span>
                                        </button>

                                        <button className="banner-actions-btn">
                                            < MovieFilterOutlinedIcon />

                                            <span>2</span>
                                        </button>
                                    </div>
                                </figure>

                                <div className="card-content">
                                    <div className="card-price">
                                        {land?.price && <strong>GHC {land?.price || ''}</strong>}
                                    </div>

                                    <h3 className="h3 card-title">
                                        <Link to={`/property-listing/property-details/${land.id}`}>{land.plotNumber}</Link>
                                    </h3>

                                    <p className="card-text">
                                        The land is dry and flat
                                    </p>

                                    <ul className="card-list">
                                        <li className="card-item">
                                            <strong>3</strong>

                                            < BedOutlinedIcon />

                                            <span>Bedrooms</span>
                                        </li>

                                        <li className="card-item">
                                            <strong>2</strong>

                                            <ManOutlinedIcon />

                                            <span>Bathrooms</span>
                                        </li>

                                        <li className="card-item">
                                            <strong>{land.size}</strong>

                                            < SquareFootOutlinedIcon />

                                            <span>Acres</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>);
                    })}

                </ul>
            </div>
        </section>
    )
}

export default Property