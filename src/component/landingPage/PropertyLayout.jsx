import React from "react";

const PropertyListingLayout = ({ children }) => {
  return (
    <div className="w-full px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingLayout;
