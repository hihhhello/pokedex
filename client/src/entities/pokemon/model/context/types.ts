export interface IPokemonContext {
  loading: boolean;
  favPokemonsApiIds: number[];
  fetchFavPokemonsApiIds: (userId: number) => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}
