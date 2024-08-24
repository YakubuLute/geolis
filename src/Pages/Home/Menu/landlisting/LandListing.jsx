import React from "react";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import { Search } from "../../../../component/landingPage";
// import { landListing } from "../../../../Assets/data/listingData";

function LandListing() {
  const landListing = {}
  return (
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
            <Typography variant="p" color={"#c9c9c9"} >
              Select at least one quality to start search
            </Typography>
           
          </Box>
          <Search />
        </Box>
        <Box className="container listing-main-content" maxWidth="1200px">
          <Typography borderBottom={"1px solid #c6c6c6"} width={'max-content'} paddingBottom={"10px"}>
            Displaying 304 of land available in <strong>Techiman - Bono East</strong>
          </Typography>
          <Card elevation={0}  variant="outlined" sx={{marginBlock:"1rem", borderRadius:"7px", padding:"1.5rem 2rem"}}>
          {/* <ListingComponent listingData={landListing} /> */}
          list all available land here
          </Card>
        </Box>
      </Stack>
    </section>
  );
}

export default LandListing;
