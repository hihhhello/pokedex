import React from 'react';
import { pokemonModel } from 'entities/pokemon';

export const withPokemonContext = (component: () => React.ReactNode) => () => {
  const { PokemonContextProvider } = pokemonModel;
  return <PokemonContextProvider>{component()}</PokemonContextProvider>;
};
