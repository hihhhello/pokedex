import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PokemonClient, NamedAPIResource } from 'pokenode-ts';
import { useNavigate } from 'react-router-dom';
import { columns } from './lib';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  SxProps,
  CircularProgress,
  Stack,
  Box,
  IconButton,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useDebounce } from 'shared/lib';
import { pokemonModel, pokemonLib } from 'entities/pokemon';

interface Props {
  PaperSx?: SxProps;
  TableContainerSx?: SxProps;
  PaginationSx?: SxProps;
}

export const List = ({ PaperSx, TableContainerSx, PaginationSx }: Props) => {
  const {
    page,
    rowsPerPage,
    totalCount,
    setTotalCount,
    setPage,
    setRowsPerPage,
  } = pokemonModel.usePokemonContext();

  const navigate = useNavigate();

  const pokemonClient = new PokemonClient();

  const [loading, setLoading] = useState(false);

  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);

  const debouncedPage = useDebounce(page, 300);
  const isMounted = useRef(false);

  const fetchPokemons = async (page: number, rowsPerPage: number) => {
    try {
      setLoading(true);
      const data = await pokemonClient.listPokemons(
        page * rowsPerPage,
        rowsPerPage
      );
      setPokemons(data.results);
      setTotalCount(data.count);
    } catch (e: any) {
      toast(e.message, {
        type: 'error',
        toastId: 'pokemons-list-error',
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

  const getPokemonDetailViewClick = useCallback(
    (name: string) => () => {
      navigate(`/pokemon/${name}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Paper
      sx={{ overflow: 'hidden', ...PaperSx }}
      data-testid="pokemons-list-paper"
    >
      <TableContainer sx={TableContainerSx}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  data-testid="pokemons-list-head-cell"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    {column.label}
                    {loading && <CircularProgress size={20} />}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons.map((row) => (
              <TableRow
                data-testid="pokemons-list-body-row"
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={{
                      justifyContent: 'space-between',
                    }}
                  >
                    <span data-testid="pokemons-list-body-row-span">
                      {row.name}
                    </span>
                    <IconButton
                      size="small"
                      sx={{ marginLeft: 2 }}
                      onClick={getPokemonDetailViewClick(row.name)}
                    >
                      <Visibility />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        data-testid="pokemons-list-pagination"
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChangeHandler}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onPageSizeChangeHandler}
        rowsPerPageOptions={pokemonLib.rowsPerPageOptions}
        sx={{ ...PaginationSx }}
      />
    </Paper>
  );
};
