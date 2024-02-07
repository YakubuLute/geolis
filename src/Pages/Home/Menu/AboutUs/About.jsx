import React from "react";
import AboutImg from "../../../../Assets/Images/General/land_11.jpg";
import AboutImg_2 from "../../../../Assets/Images/General/land_2.jpg";
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import NightlifeOutlinedIcon from '@mui/icons-material/NightlifeOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';



function About() {

    return (
        <section className="about" id="about">
            <div className="container">
                <figure className="about-banner">
                    <img src={AboutImg} alt="House interior" />

                    <img src={AboutImg_2} alt="House interior" className="abs-img" />
                </figure>

                <div className="about-content">
                    <p className="section-subtitle">About Us</p>

                    <h2 className="h2 section-title">
                        The Leading Real Estate Rental Marketplace.
                    </h2>

                    <p className="about-text">
                        With outstanding properties and trusted agents, we have listed over 500 estates properties accross the country making it easy to search for, rent or purchase your dream home.
                    </p>

                    <ul className="about-list">
                        <li className="about-item">
                            <div className="about-item-icon">
                                <VillaOutlinedIcon />
                            </div>

                            <p dclassName="about-item-text">Smart Home Design</p>
                        </li>

                        <li className="about-item">
                            <div className="about-item-icon">
                                <SpaOutlinedIcon />
                            </div>

                            <p className="about-item-text">Beautiful Scene Around</p>
                        </li>

                        <li className="about-item">
                            <div className="about-item-icon">
                                <NightlifeOutlinedIcon />
                            </div>

                            <p className="about-item-text">Exceptional Lifestyle</p>
                        </li>

                        <li className="about-item">
                            <div className="about-item-icon">

                                <VerifiedUserOutlinedIcon />
                            </div>

                            <p className="about-item-text">Complete 24/7 Security</p>
                        </li>
                    </ul>

                    <p className="callout">
                        "With geolis, you needn't worry about false or fake agents or security concerns.
                        geolis makes sure all agents are verified and all payment made
                        through us are secured and officially documented by your local
                        court. - <strong>Yakubu Lute, C.E.O - geolis</strong>"
                    </p>

                    <a href="#service" className="btn">
                        Our Services
                    </a>
                </div>
            </div>
        </section>
    );
}

export default About;
