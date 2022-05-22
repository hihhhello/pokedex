import React from 'react';
import { Stack, CircularProgress } from '@mui/material';

export const LoadingPage = React.memo(() => {
  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={150} />
    </Stack>
  );
});
