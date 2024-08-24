import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import EmptyField from './EmptyField.jsx';
import PropertyCard from './PropertyCard.tsx';
import { Box } from '@mui/material';
import { useFireStoreContext } from '../../context/FireStoreContext.js';
function Property() {
    const { landData, isLandDataLoading } = useFireStoreContext();

    try {
        if (landData.length === 0) {
            return <EmptyField fieldName="Featured Land Listings" />;
        }

        if (isLandDataLoading) {
            return (
                <Box className="container" wid>
                    <div className="container">
                        <Box className="loading-skeleton" display={'flex'} gap={'1.5rem'} mt={4}>
                            <Box width={'100%'}>
                            <Skeleton variant="rectangular" height={'300px'} width="100%" />
                            <Skeleton variant="text" height={'10px'} width="100%" />
                            <Skeleton variant="text" height={'10px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            </Box>
                            <Box width={'100%'}>
                            <Skeleton variant="rectangular" height={'300px'} width="100%" />
                            <Skeleton variant="text" height={'10px'} width="100%" />
                            <Skeleton variant="text" height={'10px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            </Box>
                            <Box width={'100%'}>
                            <Skeleton variant="rectangular" height={'300px'} width="100%" />
                            <Skeleton variant="text" height={'10px'} width="100%" />
                            <Skeleton variant="text" height={'10px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            <Skeleton variant="text" height={'30px'} width="100%" />
                            </Box>
                        </Box>
                    </div>
                </Box>
            );
        }
        return (
            <section className="property" id="property">
                <div className="container">
                    <p className="section-subtitle">Properties</p>
                    <h2 className="h2 section-title">Featured Land Listings</h2>
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