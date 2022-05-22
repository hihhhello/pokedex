import { Stack } from '@mui/material';

import { PokemonsList } from 'features/pokemons-list';

const MainPage = () => {
  return (
    <Stack
      sx={{
        height: '90vh',
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <PokemonsList
        PaperSx={{
          display: 'flex',
          flexDirection: {
            xs: 'column-reverse',
            sm: 'column',
          },
          width: {
            md: '60vw',
          },
          height: {
            xs: '90vh',
            sm: '70vh',
          },
        }}
        PaginationSx={{
          overflow: 'unset',
          div: {
            flexWrap: 'wrap',
          },
        }}
      />
    </Stack>
  );
};

export default MainPage;
