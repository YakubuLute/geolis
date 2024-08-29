import React, { useState, useMemo } from "react";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import SearchComponent from "../../../../component/landingPage/SearchComponent.jsx";
import LandlistingSkeleton from "../../../../component/shared/Skeleton/land-skeleton.jsx";
import { useFireStoreContext } from "../../../../context/FireStoreContext.js";
import EmptyField from "../../../../component/landingPage/EmptyField.jsx";
import PropertyCard from "../../../../component/landingPage/PropertyCard.tsx";

function LandListing() {
  const { landData, isLandDataLoading } = useFireStoreContext();
  const [searchCriteria, setSearchCriteria] = useState(null);

  const filteredLandData = useMemo(() => {
    if (!searchCriteria) return landData;

    return landData.filter((land) => {
      const matchesLocation =
        searchCriteria.locations.length === 0 ||
        searchCriteria.locations.includes(land.location);
      const matchesZoning =
        searchCriteria.zoning.length === 0 ||
        searchCriteria.zoning.includes(land.zoning);
      const matchesSize =
        searchCriteria.size.length === 0 ||
        searchCriteria.size.includes(land.size);
      const matchesSlope =
        searchCriteria.slope.length === 0 ||
        searchCriteria.slope.includes(land.slope);

      return matchesLocation && matchesZoning && matchesSize && matchesSlope;
    });
  }, [landData, searchCriteria]);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  if (isLandDataLoading) {
    return <LandlistingSkeleton />;
  }

  if (filteredLandData.length === 0) {
    return <EmptyField fieldName="land" />;
  }

  return (
    <>
      <section className="section listing-section">
        <Stack
          direction={"column"}
          spacing={5}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box className={"listing-search-header"}>
            <Box display={"grid"} className="container">
              <Typography variant="h4" fontWeight={800} color={"#fff"}>
                Search for Land
              </Typography>
              <Typography variant="p" color={"#c9c9c9"}>
                Select at least one quality to start search
              </Typography>
            </Box>
            <SearchComponent onSearch={handleSearch} />
          </Box>
          <Box className="container listing-main-content" maxWidth="1400px">
            <h2 className="h3 text-center text">
              Displaying {filteredLandData.length} land available
            </h2>
            <Card
              elevation={0}
              variant="outlined"
              sx={{ marginBlock: "1rem", borderRadius: "7px", padding: "1.5rem 2rem" }}
            >
              <ul className="land-listing-items">
                {filteredLandData.map((land) => (
                  <li key={land.id}>
                    <PropertyCard land={land} />
                  </li>
                ))}
              </ul>
            </Card>
          </Box>
        </Stack>
      </section>
    </>
  );
}

export default LandListing;