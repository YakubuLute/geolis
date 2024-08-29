import { Box, Skeleton } from '@mui/material';
import React from 'react';

export default function LandlistingSkeleton(){
    return <div>
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
    </div>
}