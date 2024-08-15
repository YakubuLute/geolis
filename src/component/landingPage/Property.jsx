import React from 'react'

import { useUserProfile } from "../../context/UserContext"
import Skeleton from '@mui/material/Skeleton';
import EmptyField from './EmptyField';
import PropertyCard from './PropertyCard';
function Property() {
    const { landData, isLandDataLoading } = useUserProfile();
    console.log("Land information stored", landData)

    try {
        if (landData.length === 0) {
            return <EmptyField fieldName="Featured Listings" />;
        }

        if (isLandDataLoading) {
            return (
                <div className="loading-skeleton">
                    <Skeleton variant="text" height={30} width="60%" />
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="text" height={20} width="40%" />
                    <Skeleton variant="text" height={20} width="70%" />
                </div>
            );
        }
        return (
            <section className="property" id="property">
            <div className="container">
                <p className="section-subtitle">Properties</p>
                <h2 className="h2 section-title">Featured Listings</h2>
                <ul className="property-list has-scrollbar">
                    {landData.map((land) => (
                        <li key={land.id}>
                            <PropertyCard land={land} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
        );
    } catch (error) {
        console.error("Error rendering Property component:", error);
        return <div className="error-message">An unexpected error occurred. Please try again later.</div>;
    }
}

export default Property