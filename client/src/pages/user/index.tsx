import { useEffect, useState, useRef } from 'react';
import { Box, CircularProgress, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';
import { githubPokedexApi, UserFavPokemon } from 'shared/api';
import { userModel } from 'entities/user';
import { PokemonCard, pokemonLib } from 'entities/pokemon';
import { ToggleFavPokemon } from 'features/toggle-fav-pokemon';
import { useDebounce } from 'shared/lib';

const UserPage = () => {
  const { user } = userModel.context.useUserContext();

  const [favPokemons, setFavPokemons] = useState<UserFavPokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    pokemonLib.rowsPerPageOptions[0]
  );
  const [totalCount, setTotalCount] = useState(0);

  const debouncedPage = useDebounce(page, 300);
  const isMounted = useRef(false);

  const fetchPokemons = async (page: number, rowsPerPage: number) => {
    try {
      setLoading(true);
      const { data } = await githubPokedexApi.getFavPokemons(user!.id, {
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      });

      setFavPokemons(data.results);
      setTotalCount(data.count);
    } catch (e: any) {
      toast(e.message, {
        type: 'error',
        toastId: 'fav-pokemons-list-error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(page, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage]);

  useEffect(() => {
    if (isMounted.current) {
      fetchPokemons(debouncedPage, rowsPerPage);
      return;
    }

    isMounted.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPage]);

  const onPageChangeHandler = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onPageSizeChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <TablePagination
        data-testid="fav-pokemons-list-pagination"
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChangeHandler}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onPageSizeChangeHandler}
        rowsPerPageOptions={pokemonLib.rowsPerPageOptions}
        sx={{
          overflow: 'unset',
          div: {
            flexWrap: 'wrap',
            boxShadow: '5px 5px 15px 5px rgba(0,0,0,0)',
          },
        }}
      />
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: {
            sm: '100vw',
          },
          gap: 4,
          overflowX: {
            xs: 'hidden',
            sm: 'auto',
          },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: {
              sm: '999vw',
            },
            gap: 4,
            padding: {
              xs: 4,
            },
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            favPokemons.map((item) => (
              <PokemonCard
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '250px',
                }}
                key={item.id}
                name={item.favPokemon.name}
                avatarUrl={item.favPokemon.avatarUrl}
                actions={[
                  <ToggleFavPokemon
                    defaultChecked={true}
                    pokemonData={{ ...item.favPokemon }}
                  />,
                ]}
              />
            ))
          )}
        </Box>
      </Box>
      <TablePagination
        data-testid="fav-pokemons-list-pagination"
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChangeHandler}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onPageSizeChangeHandler}
        rowsPerPageOptions={pokemonLib.rowsPerPageOptions}
        sx={{
          display: {
            sm: 'none',
          },
          div: {
            flexWrap: 'wrap',
          },
        }}
      />
    </Box>
  );
};

export default UserPage;
