import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingPage } from 'shared/ui';
import { ToggleFavPokemon } from 'features/toggle-fav-pokemon';
import { pokemonModel, PokemonCard } from 'entities/pokemon';
import { PokStats } from 'shared/api';

const PokemonPage = () => {
  const { favPokemonsApiIds } = pokemonModel.usePokemonContext();

  const { name } = useParams();

  const pokemonClient = new PokemonClient();

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonStats, setPokemonStats] = useState<PokStats | null | undefined>(
    null
  );

  const getPokemon = async (pokemonName: string) => {
    try {
      setLoading(true);
      const data = await pokemonClient.getPokemonByName(pokemonName);

      setPokemon(data);
    } catch (e: any) {
      toast(e.message, {
        type: 'error',
        toastId: 'pokemon-page-error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      getPokemon(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pokemon record from local DB
  const getLocalPokemon = async (pokemonId: number) => {
    const data = await pokemonModel.fetchOnePokemon(pokemonId);
    setPokemonStats(data?.stats);
  };

  useEffect(() => {
    if (pokemon) {
      getLocalPokemon(pokemon.id);
    }
  }, [pokemon]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Stack
      display="flext"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: {
          xs: 4,
          sm: 4,
        },
      }}
    >
      {pokemon && (
        <PokemonCard
          sx={{
            width: 'min(100%, 400px)',
          }}
          name={name}
          averageRating={pokemonStats?.average}
          avatarUrl={pokemon?.sprites?.front_default}
          actions={[
            <ToggleFavPokemon
              pokemonData={{
                apiId: pokemon.id,
                avatarUrl: pokemon?.sprites?.front_default,
                name: pokemon!.name,
              }}
              defaultChecked={favPokemonsApiIds.includes(pokemon.id)}
            />,
          ]}
        />
      )}
    </Stack>
  );
};

export default PokemonPage;
