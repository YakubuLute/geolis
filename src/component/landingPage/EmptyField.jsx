import React from 'react'
import classes from './emptyfield.module.css';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

function EmptyField({fieldName='Data'}) {
  return (
    <div className={classes.wrapper}>
        <h1 className={classes.h1}>No {fieldName} Found</h1>
        <p className={classes.subtitle}>Try refreshing the page or check your internet connection.</p>
       <div className={classes.brokenImage}>
       <BrokenImageIcon />
       </div>
    </div>
  )
}

export default EmptyField