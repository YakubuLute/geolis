import { Button, ButtonProps } from '@mantine/core';
import { Twitter } from '@mui/icons-material';
import React from 'react';

export function TwitterButton(props) {
  return (
    <Button
      leftSection={<Twitter style={{ width: '1rem', height: '1rem' }} />}
      variant="default"
      {...props}
    />
  );
}