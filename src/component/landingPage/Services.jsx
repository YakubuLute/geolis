import React from 'react'
import serviceImg_1 from "../../Assets/Images/General/service-1.png";
import serviceImg_2 from "../../Assets/Images/General/service-2.png";
import serviceImg_3 from "../../Assets/Images/General/service-3.png";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { Link } from 'react-router-dom';

function Services() {
    return (
        <section className="service" id="service">
            <div className="container">
                <p className="section-subtitle">Our Services</p>

                <h2 className="h2 section-title">Our Main Focus</h2>

                <ul className="service-list">
                    <li>
                        <div className="service-card">
                            <div className="card-icon">
                                <img
                                    src={serviceImg_1}
                                    alt="Service 1"
                                />
                            </div>
                            <h3 className="h3 card-title">
                                <Link to="/property-listing">To enhance the preparation of lease</Link>
                            </h3>
                            <p className="card-text">
                                over 100+ lands for sale available on the website, we
                                can match you with a house you will want to call land.
                            </p>
                            <Link to="/property-listing" className="card-link">
                                <span>Buy A land</span>
                                <ArrowRightAltOutlinedIcon />
                            </Link>
                        </div>
                    </li>

                    <li>
                        <div className="service-card">
                            <div className="card-icon">
                                <img
                                    src={serviceImg_2}
                                    alt="Service 2"
                                />
                            </div>

                            <h3 className="h3 card-title">
                                <Link to="/property-listing">Rent a land</Link>
                            </h3>

                            <p className="card-text">
                                over 100+ lands for rent available on the website, we
                                can match you with a land that perfetly suits you.
                            </p>

                            <Link to="/property-listing" className="card-link">
                                <span>Rent A Land</span>
                                <ArrowRightAltOutlinedIcon />

                            </Link>
                        </div>
                    </li>

                    <li>
                        <div className="service-card">
                            <div className="card-icon">
                                <img
                                    src={serviceImg_3}
                                    alt="Service 3"
                                />
                            </div>

                            <h3 className="h3 card-title">
                                <Link to="/auth">Sell a Land</Link>
                            </h3>

                            <p className="card-text">
                                It's easy to sign up and get verified as an agent with Geolis. Sign Up for free to get verified and start earning.
                            </p>

                            <Link to="/property-listing" className="card-link">
                                <span>Sell A Land</span>
                                <ArrowRightAltOutlinedIcon />
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Services