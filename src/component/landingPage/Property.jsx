import React from 'react'
import { Link } from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Property_1 from "../../Assets/Images/General/land_1.jpg"
import Property_2 from "../../Assets/Images/General/land_1.jpg"
import Property_3 from "../../Assets/Images/General/land_1.jpg"
import Property_4 from "../../Assets/Images/General/land_1.jpg"
import Avatar from '../../Assets/Images/General/avatar.png';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';

function Property() {
    return (
        <section className="property" id="property">
            <div className="container">
                <p className="section-subtitle">Properties</p>

                <h2 className="h2 section-title">Featured Listings</h2>

                <ul className="property-list has-scrollbar">
                    <li>
                        <div className="property-card">
                            <figure className="card-banner">
                                <Link to="/property-listing/property-details/">
                                    <img
                                        src={Property_1}
                                        alt="New Apartment Nice View"
                                        className="w-100"
                                    />
                                </Link>

                                <div className="card-badge green">For Rent</div>

                                <div className="banner-actions">
                                    <button className="banner-actions-btn">
                                        < LocationOnOutlinedIcon />

                                        <address>East Legon, Accra</address>
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
                                    <strong>$34,900</strong>/Month
                                </div>

                                <h3 className="h3 card-title">
                                    <Link to="/property-listing/property-details/">New Apartment Nice View</Link>
                                </h3>

                                <p className="card-text">
                                    Beautiful Huge 1 Family House In Heart Of Westbury. Newly
                                    Renovated With New Wood
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
                                        <strong>3450</strong>

                                        < SquareFootOutlinedIcon />

                                        <span>Square Ft</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-footer">
                                <div className="card-author">
                                    <figure className="author-avatar">
                                        <img
                                            src={Avatar}
                                            alt="Yakubu Lute"
                                            className="w-100"
                                        />
                                    </figure>

                                    <div>
                                        <p className="author-name">
                                            <Link to="#">Yakubu Lute</Link>
                                        </p>

                                        <p className="author-title">Estate Agents</p>
                                    </div>
                                </div>

                                <div className="card-footer-actions">
                                    <button className="card-footer-actions-btn">
                                        <AspectRatioOutlinedIcon />
                                    </button>

                                    <button className="card-footer-actions-btn">
                                        < FavoriteBorderOutlinedIcon />
                                    </button>

                                    <button className="card-footer-actions-btn">
                                        < AddCircleOutlineOutlinedIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="property-card">
                            <figure className="card-banner">
                                <Link to="/property-listing/property-details/">
                                    <img
                                        src={Property_2}
                                        alt="Modern Apartments"
                                        className="w-100"
                                    />
                                </Link>

                                <div className="card-badge orange">For Sales</div>

                                <div className="banner-actions">
                                    <button className="banner-actions-btn">
                                        < LocationOnOutlinedIcon />

                                        <address>Adjiringano, Accra</address>
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
                                <div className="card-price">
                                    <strong>$34,900</strong>/Month
                                </div>

                                <h3 className="h3 card-title">
                                    <Link to="#">Modern Apartments</Link>
                                </h3>

                                <p className="card-text">
                                    Beautiful Huge 1 Family House In Heart Of Westbury. Newly
                                    Renovated With New Wood
                                </p>

                                <ul className="card-list">
                                    <li className="card-item">
                                        <strong>3</strong>

                                        < BedOutlinedIcon />

                                        <span>Bedrooms</span>
                                    </li>

                                    <li className="card-item">
                                        <strong>2</strong>

                                        < ManOutlinedIcon />

                                        <span>Bathrooms</span>
                                    </li>

                                    <li className="card-item">
                                        <strong>3450</strong>

                                        < SquareFootOutlinedIcon />

                                        <span>Square Ft</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-footer">
                                <div className="card-author">
                                    <figure className="author-avatar">
                                        <img
                                            src={Avatar}
                                            alt="Yakubu Lute"
                                            className="w-100"
                                        />
                                    </figure>

                                    <div>
                                        <p className="author-name">
                                            <Link to="#">Yakubu Lute</Link>
                                        </p>

                                        <p className="author-title">Estate Agents</p>
                                    </div>
                                </div>

                                <div className="card-footer-actions">
                                    <button className="card-footer-actions-btn">
                                        < AspectRatioOutlinedIcon />
                                    </button>

                                    <button className="card-footer-actions-btn">
                                        < FavoriteBorderOutlinedIcon />
                                    </button>

                                    <button className="card-footer-actions-btn">
                                        < AddCircleOutlineOutlinedIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="property-card">
                            <figure className="card-banner">
                                <Link to="#">
                                    <img
                                        src={Property_3}
                                        alt="Comfortable Apartment"
                                        className="w-100"
                                    />
                                </Link>

                                <div className="card-badge green">For Rent</div>

                                <div className="banner-actions">
                                    <button className="banner-actions-btn">
                                        < LocationOnOutlinedIcon />

                                        <address>Airport Residential, Accra</address>
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
                                <div className="card-price">
                                    <strong>$34,900</strong>/Month
                                </div>

                                <h3 className="h3 card-title">
                                    <Link to="#">Comfortable Apartment</Link>
                                </h3>

                                <p className="card-text">
                                    Beautiful Huge 1 Family House In Heart Of Westbury. Newly
                                    Renovated With New Wood
                                </p>

                                <ul className="card-list">
                                    <li className="card-item">
                                        <strong>3</strong>

                                        < BedOutlinedIcon />

                                        <span>Bedrooms</span>
                                    </li>

                                    <li className="card-item">
                                        <strong>2</strong>

                                        < ManOutlinedIcon />

                                        <span>Bathrooms</span>
                                    </li>

                                    <li className="card-item">
                                        <strong>3450</strong>

                                        < SquareFootOutlinedIcon />

                                        <span>Square Ft</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-footer">
                                <div className="card-author">
                                    <figure className="author-avatar">
                                        <img
                                            src={Avatar}
                                            alt="Yakubu Lute"
                                            className="w-100"
                                        />
                                    </figure>

                                    <div>
                                        <p className="author-name">
                                            <Link to="#">Yakubu Lute</Link>
                                        </p>

                                        <p className="author-title">Estate Agents</p>
                                    </div>
                                </div>

                                <div className="card-footer-actions">
                                    <button className="card-footer-actions-btn">
                                        < AspectRatioOutlinedIcon />
                                    </button>

                                    <button className="card-footer-actions-btn">
                                        < FavoriteBorderOutlinedIcon />
                                    </button>

                                    <button className="card-footer-actions-btn">
                                        <AddCircleOutlineOutlinedIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="property-card">
                            <figure className="card-banner">
                                <Link to="#">
                                    <img
                                        src={Property_4}
                                        alt="Luxury villa in Rego Park"
                                        className="w-100"
                                    />
                                </Link>

                                <div className="card-badge green">For Rent</div>

                                <div className="banner-actions">
                                    <button className="banner-actions-btn">
                                        < LocationOnOutlinedIcon />

                                        <address>Asokore Mampong, Kumasi</address>
                                    </button>

                                    <button className="banner-actions-btn">
                                        < PhotoLibraryOutlinedIcon />

                                        <span>4</span>
                                    </button>

                                    <button className="banner-actions-btn">
                                        <MovieFilterOutlinedIcon />

                                        <span>2</span>
                                    </button>
                                </div>
                            </figure>

                            <div className="card-content">
                                <div className="card-price">
                                    <strong>$34,900</strong>/Month
                                </div>

                                <h3 className="h3 card-title">
                                    <Link to="#">Luxury villa in Rego Park</Link>
                                </h3>

                                <p className="card-text">
                                    Beautiful Huge 1 Family House In Heart Of Westbury. Newly
                                    Renovated With New Wood
                                </p>

                                <ul className="card-list">
                                    <li className="card-item">
                                        <strong>3</strong>

                                        < BedOutlinedIcon />

                                        <span>Bedrooms</span>
                                    </li>

                                    <li className="card-item">
                                        <strong>2</strong>

                                        < ManOutlinedIcon />

                                        <span>Bathrooms</span>
                                    </li>

                                    <li className="card-item">
                                        <strong>3450</strong>

                                        < SquareFootOutlinedIcon />

                                        <span>Square Ft</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-footer">
                                <div className="card-author">
                                    <figure className="author-avatar">
                                        <img
                                            src={Avatar}
                                            alt="Yakubu Lute"
                                            className="w-100"
                                        />
                                    </figure>

                                    <div>
                                        <p className="author-name">
                                            <Link to="#">Yakubu Lute</Link>
                                        </p>

                                        <p className="author-title">Estate Agents</p>
                                    </div>
                                </div>

                                <div className="card-footer-actions">
                                    <button className="card-footer-actions-btn">
                                        <ion-icon name="resize-outline"></ion-icon>
                                    </button>

                                    <button className="card-footer-actions-btn">
                                        < FavoriteBorderOutlinedIcon />
                                    </button>

                                    <button className="card-footer-actions-btn">
                                        <ion-icon name="add-circle-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Property