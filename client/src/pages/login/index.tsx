import { Stack } from '@mui/material';
import { GithubAuthButton } from 'features/auth';

const AuthPage = () => {
  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: 'grey.200',
      }}
    >
      <GithubAuthButton />
    </Stack>
  );
};

export default AuthPage;
