import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from '../../../component/Dashboard/iconify';
import { products } from '../../../_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CustomModal from '../../../component/shared/Modal';
import { useFireStoreContext } from '../../../context/FireStoreContext.js';
import {UploadLandComponent} from './upload-land-component.tsx';
import PropertyCard from '../../../component/landingPage/PropertyCard.tsx';


export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const {landData} = useFireStoreContext();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Available Lands</Typography>

        <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add A New Listing
        </Button>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
      <Card
              elevation={0}
              variant="outlined"
              sx={{ marginBlock: "1rem", borderRadius: "7px", padding: "1.5rem 2rem" }}
            >
              <ul className="land-listing-items dashboard-listing">
                {landData?.map((land) => (
                  <li key={land.id}>
                    <PropertyCard land={land} sliceText showActionBtn/>
                  </li>
                ))}
              </ul>
            </Card>
      </Grid>

      <CustomModal title={'Add New Land'} open={open} handleClose={handleClose}>
      
       <UploadLandComponent/>
        
      </CustomModal>

      <Box mt={10}>
        <ProductCartWidget />
      </Box>
    </Container>
  );
}
