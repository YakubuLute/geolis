import VillaOutlined from '@mui/icons-material/VillaOutlined'
import React from 'react'
import HeroBanner from "../../Assets/Images/General/land_11.jpg"
function Hero() {
    return (
 
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <p className="hero-subtitle">
                        <VillaOutlined />

                        <span>Geolis - Next step to landing your dream land safely.</span>
                    </p>

                    <h2 className="h1 hero-title">Getting information about land has never been so easy</h2>

                    <p className="hero-text">
                        Geolis got you covered. We have over 500+ lands verified and with over 100 verified and trusted land property agents accros the city.
                        For more information, please visit our property or agent listing page by clicking on the link in the navigation button.
                    </p>

                    <button className="btn">Make An Enquiry</button>
                </div>

                <figure className="hero-banner">
                    <img
                        src={HeroBanner}
                        alt="Well Decorated Estate"
                        className="w-100"
                    />
                </figure>
            </div>
        </section>

    )
}

export default Hero