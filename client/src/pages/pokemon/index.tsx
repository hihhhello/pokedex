import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingPage } from 'shared/ui';
import { ToggleFavPokemon } from 'features/toggle-fav-pokemon';
import { pokemonModel, PokemonCard } from 'entities/pokemon';
import { PokRating, FavPokemon } from 'shared/api';
import { AddPokReview } from 'features/add-pok-review';
import { userModel } from 'entities/user';

const PokemonPage = () => {
  const { favPokemonsApiIds } = pokemonModel.usePokemonContext();
  const { user } = userModel.context.useUserContext();

  const { name } = useParams();

  const pokemonClient = new PokemonClient();

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [localPokemon, setLocalPokemon] = useState<FavPokemon>();
  const [pokemonRatings, setPokemonRatings] = useState<PokRating[]>([]);

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
  const getLocalPokemon = async (apiId: number) => {
    setLoading(true);
    const data = await pokemonModel.fetchOnePokemonByApiId(apiId);
    if (data) {
      setLocalPokemon(data);
      await getLocalPokemonRatings(data.id);
    }
    setLoading(false);
  };

  const getLocalPokemonRatings = async (pokemonId: number) => {
    setLoading(true);
    const data = await pokemonModel.fetchPokemonRatings(pokemonId);
    if (data) {
      setPokemonRatings(data.results);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (pokemon) {
      getLocalPokemon(pokemon.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: {
            xs: 2,
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
            averageRating={localPokemon?.stats.average}
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
      {user && pokemon && (
        <AddPokReview
          pokemon={{
            apiId: localPokemon?.apiId || pokemon.id,
            name: pokemon.name,
            avatarUrl: pokemon.name,
          }}
          userId={user.id}
          fetchRatings={getLocalPokemonRatings}
          fetchPokemon={getLocalPokemon}
        />
      )}
    </Stack>
  );
};

export default PokemonPage;
