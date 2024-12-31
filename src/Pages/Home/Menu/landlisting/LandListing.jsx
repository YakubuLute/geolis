import React, { useState, useMemo } from "react";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import SearchComponent from "../../../../component/landingPage/SearchComponent.jsx";
import LandlistingSkeleton from "../../../../component/shared/Skeleton/land-skeleton.jsx";
import { useFireStoreContext } from "../../../../context/FireStoreContext.js";
// import EmptyField from "../../../../component/landingPage/EmptyField.jsx";
import PropertyCard from "../../../../component/landingPage/PropertyCard.jsx";

function LandListing() {
  const { landData, isLandDataLoading } = useFireStoreContext();
  const [searchCriteria, setSearchCriteria] = useState(null);

  const filteredLandData = useMemo(() => {
    if (!searchCriteria) return landData;

    return landData.filter((land) => {
      const matchesLocation =
        searchCriteria.locations?.length === 0 ||
        searchCriteria.locations?.includes(land?.location);

      const matchesPrice =
        searchCriteria.price?.length === 0 ||
        searchCriteria.price?.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return (
            land.price >= min && (isFinite(max) ? land.price <= max : true)
          );
        });

      const matchesSize =
        searchCriteria.size?.length === 0 ||
        searchCriteria.size?.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return land.size >= min && (isFinite(max) ? land.size <= max : true);
        });

      const matchesSlope =
        searchCriteria.slope?.length === 0 ||
        searchCriteria.slope?.includes(land?.ground);

      return matchesLocation && matchesPrice && matchesSize && matchesSlope;
    });
  }, [landData, searchCriteria]);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  if (isLandDataLoading) {
    return <LandlistingSkeleton />;
  }

  // if (filteredLandData?.length === 0) {
  //   return <EmptyField fieldName="Land" />;
  // }
  const handleClearSearch = () => {
    setSearchCriteria(null);
  };

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
                Select at least one property to start search
              </Typography>
            </Box>
            <SearchComponent onSearch={handleSearch} />
          </Box>
          <Box className="container listing-main-content" maxWidth="1400px">
            <h2 className="h3 text-center text mb-">
              Displaying {filteredLandData.length} land available
            </h2>
            {filteredLandData.length === 0 ? (
              <Card
                elevation={0}
                variant="outlined"
                sx={{
                  marginBlock: "1rem",
                  borderRadius: "7px",
                  padding: "2.5rem 3rem",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  No results found for your search criteria
                </Typography>
                <Button
                  variant="contained"
                  mt={"30px"}
                  disableElevation
                  color="primary"
                  onClick={handleClearSearch}
                >
                  Clear Search
                </Button>
              </Card>
            ) : (
              <Card
                elevation={0}
                variant="outlined"
                sx={{
                  marginBlock: "1rem",
                  borderRadius: "7px",
                  padding: "1.5rem 2rem",
                }}
              >
                <ul className="land-listing-items">
                  {filteredLandData.map((land) => (
                    <li key={land.id} className="items-list">
                      <PropertyCard
                        key={land.id}
                        land={land}
                        sliceText
                        showActionBtn
                        isDashboardListing
                      />
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </Box>
        </Stack>
      </section>
    </>
  );
}

export default LandListing;
