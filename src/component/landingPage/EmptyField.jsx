import React from 'react'
import classes from './emptyfield.module.css';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Button, Group } from '@mantine/core';

function EmptyField({fieldName='Data'}) {
  return (
    <div className={classes.wrapper}>
        <h1 className={classes.h1}>No {fieldName} Found</h1>
        <p className={classes.subtitle}>Try refreshing the page or check your internet connection.</p>
       <div className={classes.brokenImage}>
       <BrokenImageIcon />

       </div>
       <Group align='center' w={'100%'} justify='center' mt={5}>
       <Button onClick={()=>window.location.reload()} className={classes.button}>Try Again</Button>
       </Group>
    </div>
  )
}

export default EmptyField