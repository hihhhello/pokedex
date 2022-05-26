import React from 'react';
import { GitHub } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GITHUB_OAUTH_LINK } from 'shared/lib';

export const GithubAuthButton = () => {
  const onClickHandler = () => {
    window.location.replace(GITHUB_OAUTH_LINK);
  };

  return (
    <Button
      data-testid="github-auth-btn"
      variant="contained"
      startIcon={<GitHub />}
      onClick={onClickHandler}
    >
      Sign In via GitHub OAuth
    </Button>
  );
};
