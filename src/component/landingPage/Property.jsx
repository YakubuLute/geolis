import React from "react";
import EmptyField from "./EmptyField.jsx";
import PropertyCard from "./PropertyCard.jsx";
import { useFireStoreContext } from "../../context/FireStoreContext.js";
import LandlistingSkeleton from "../shared/Skeleton/land-skeleton.jsx";

function Property() {
  const { landData, isLandDataLoading } = useFireStoreContext();

  try {
    if (landData.length === 0) {
      return <EmptyField fieldName="Featured Land Listings" />;
    }

    if (isLandDataLoading) {
      return <LandlistingSkeleton />;
    }
    return (
      <section className="property" id="property">
        <div className="container">
          <p className="section-subtitle">Properties</p>
          <h2 className="h2 section-title">Featured Land Listings</h2>
          <ul className="property-list has-scrollbar">
            <li className="items-list">
              {landData?.map((land) => (
                <PropertyCard key={land.id} land={land} isDashboardListing />
              ))}
            </li>
          </ul>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error rendering Property component:", error);
    return (
      <div className="error-message">
        An unexpected error occurred. Please try again later.
      </div>
    );
  }
}

export default Property;
