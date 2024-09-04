import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from '../../../Routes/dashboardroutes/components';


const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        // width: 40,
        height: 40,
        display: 'inline-flex',
        marginBottom:3,
        ...sx,
      }}
      {...other}
    >
  
        <div className="logo">
        <h1 className="h1">
              GEO
              <span>LIS</span>
            </h1>
        </div>
       
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/dashboard" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
