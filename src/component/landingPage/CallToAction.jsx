import React from 'react'
import { Link } from 'react-router-dom';

function CallToAction() {
    return (
        <section className="call-to-action">
            <div className="container">
                <div className="call-to-action-card">
                    <div className="card-content">
                        <h2 className="h2 card-title">Looking for a secure and <br/>affordable land?</h2>

                        <p className="card-text">
                            We can help you realize your dream of acquiring a 
                                    cheap <br/>and secured land with just a few clicks.
                        </p>
                    </div>

                    <Link to="/land-listing" className="btn call-to-action-btn">
                        <span>Explore Properties</span>

                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CallToAction;