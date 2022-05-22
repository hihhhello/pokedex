import { CssBaseline, Box } from '@mui/material';
import { Routes } from 'pages';
import { withProviders } from './providers';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from 'widgets/header';

const App = () => {
  return (
    <Box maxWidth="100vw" minHeight="100vh">
      <ToastContainer />
      <CssBaseline />
      <Header />
      <Routes />
    </Box>
  );
};

export default withProviders(App);
