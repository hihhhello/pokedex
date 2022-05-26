import React from 'react';
import { Logout } from '@mui/icons-material';
import { Stack, IconButton, Typography } from '@mui/material';
import { userModel } from 'entities/user';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const { logout, user, authorizing } = userModel.context.useUserContext();

  const onLogout = () => {
    logout();
  };

  return (
    user && (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: '10vh',
          backgroundColor: 'primary.dark',
          paddingBlock: 1,
          paddingInline: 2,
        }}
      >
        {!authorizing && (
          <>
            <Typography
              sx={{
                a: {
                  color: 'common.white',
                  ':hover': {
                    color: 'grey.500',
                  },
                  transition: '.3s all',
                },
              }}
            >
              <NavLink to="/">Home</NavLink>
            </Typography>
            <Typography
              sx={{
                a: {
                  color: 'common.white',
                  flex: 1,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: '.3s all',
                  ':hover': {
                    color: 'grey.500',
                  },
                  fontSize: 18,
                },
              }}
            >
              <NavLink to={`/${user!.login}`} data-testid="header-login">
                {user!.login}
              </NavLink>
            </Typography>
            <IconButton
              sx={{ color: 'common.white' }}
              size="large"
              data-testid="header-logout"
              onClick={onLogout}
            >
              <Logout />
            </IconButton>
          </>
        )}
      </Stack>
    )
  );
};
