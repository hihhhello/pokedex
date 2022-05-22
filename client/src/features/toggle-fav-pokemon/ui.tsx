import React, { useEffect, useRef } from 'react';
import { Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { githubPokedexApi, AddFavPokemonDto } from 'shared/api';
import { userModel } from 'entities/user';
import { parseAxiosError, useDebounce } from 'shared/lib';
import { AxiosError } from 'axios';
import { pokemonModel } from 'entities/pokemon';

interface Props {
  pokemonData: AddFavPokemonDto;
  defaultChecked?: boolean;
}

export const ToggleFavPokemon = React.memo(
  ({ pokemonData, defaultChecked }: Props) => {
    const { user } = userModel.context.useUserContext();
    const { fetchFavPokemonsApiIds } = pokemonModel.usePokemonContext();

    const [checked, setChecked] = React.useState(defaultChecked);

    const debouncedChecked = useDebounce(checked, 300);

    const isMounted = useRef(false);

    const onAddFav = async () => {
      try {
        await githubPokedexApi.addFavPokemon(user!.id, pokemonData);
        await fetchFavPokemonsApiIds(user!.id);
        toast(`${pokemonData.name} was added to favorites`, {
          type: 'success',
          toastId: `${pokemonData.name}-success-fav-add`,
        });
      } catch (e: any) {
        if (e instanceof AxiosError) {
          const { statusText, message } = parseAxiosError(e);

          toast(message || statusText, {
            type: 'error',
            toastId: `${pokemonData.name}-add-to-fav-error`,
          });
          return;
        }
        toast(e.message, {
          type: 'error',
          toastId: `${pokemonData.name}-add-to-fav-error`,
        });
      }
    };

    const onDeleteFav = async () => {
      try {
        await githubPokedexApi.deleteFavPokemon(user!.id, pokemonData.apiId);
        await fetchFavPokemonsApiIds(user!.id);
        toast(`${pokemonData.name} was removed from favorites`, {
          type: 'success',
          toastId: `${pokemonData.name}-success-fav-delete`,
        });
      } catch (e: any) {
        if (e instanceof AxiosError) {
          const { statusText, message } = parseAxiosError(e);

          toast(message || statusText, {
            type: 'error',
            toastId: `${pokemonData.name}-delete-fav-error`,
          });
          return;
        }
        toast(e.message, {
          type: 'error',
          toastId: `${pokemonData.name}-delete-fav-error`,
        });
      }
    };

    useEffect(() => {
      if (isMounted.current) {
        if (debouncedChecked) {
          onAddFav();
        } else {
          onDeleteFav();
        }
        return;
      }

      isMounted.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedChecked]);

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
      <Checkbox
        data-testid="toggle-fav-pokemon"
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={checked}
        // @ts-ignore
        onClick={onCheckboxChange}
      />
    );
  }
);
