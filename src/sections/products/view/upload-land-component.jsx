import React from 'react';
import { TextInput } from '@mantine/core';
import classes from './contained-input.module.css';

export function UploadLandComponent() {
  return (
    <>
      <TextInput label="Shipping address" placeholder="15329 Huston 21st" classNames={classes} />

    </>
  );
}