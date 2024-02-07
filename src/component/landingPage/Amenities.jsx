import React from 'react'
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import VillaOutlined from '@mui/icons-material/VillaOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';


import { Link } from 'react-router-dom';
function Amenities() {
    return (

        <section className="features">
            <div className="container">
            <p className="section-subtitle">Our Services</p>

<h2 className="h2 section-title">Our Main Focus</h2>
                <ul className="features-list">
                    <li>
                        <Link to="/feature-list/" className="features-card">
                            <div className="card-icon">
                                < AirportShuttleOutlinedIcon />

                            </div>

                            <h3 className="card-title">Parking Space</h3>
                            <div className="card-btn">
                                < EastOutlinedIcon />
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" className="features-card">
                            <div className="card-icon">
                                <WaterOutlinedIcon />

                            </div>

                            <h3 className="card-title">Swimming Pool</h3>

                            <div className="card-btn">
                                < EastOutlinedIcon />
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" className="features-card">
                            <div className="card-icon">
                                < ShieldOutlinedIcon />
                            </div>

                            <h3 className="card-title">Private Security</h3>

                            <div className="card-btn">
                                <EastOutlinedIcon />
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" className="features-card">
                            <div className="card-icon">
                                < MonitorHeartOutlinedIcon />
                            </div>

                            <h3 className="card-title">Medical Center</h3>

                            <div className="card-btn">
                                < EastOutlinedIcon />
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" className="features-card">
                            <div className="card-icon">
                                < LocalLibraryOutlinedIcon />
                            </div>

                            <h3 className="card-title">Library Area</h3>

                            <div className="card-btn">
                                < EastOutlinedIcon />
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" className="features-card">
                            <div className="card-icon">
                                < BedOutlinedIcon />
                            </div>

                            <h3 className="card-title">King Size Beds</h3>

                            <div className="card-btn">
                                < EastOutlinedIcon />
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" className="features-card">
                            <div className="card-icon">
                                < VillaOutlined />
                            </div>

                            <h3 className="card-title">Smart Homes</h3>

                            <div className="card-btn">
                                < EastOutlinedIcon />
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" className="features-card">
                            <div className="card-icon">
                                < SportsSoccerOutlinedIcon />
                            </div>

                            <h3 className="card-title">Kid's Playland</h3>

                            <div className="card-btn">
                                < EastOutlinedIcon />
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Amenities;