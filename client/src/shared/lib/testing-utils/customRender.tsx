import { render } from '@testing-library/react';
import { pokemonModel, IPokemonContext } from 'entities/pokemon';
import { userModel, IUserContext } from 'entities/user';
import { BrowserRouter } from 'react-router-dom';

export const customRender = ({
  node,
  userContextValues,
  pokemonContextValues,
}: {
  node: JSX.Element | null;
  userContextValues?: IUserContext;
  pokemonContextValues?: IPokemonContext;
}) => {
  const { UserContext, initialValues: userInitial } = userModel.context;
  const { PokemonContext, initialValues: pokemonInitial } = pokemonModel;
  return {
    ...render(
      <BrowserRouter>
        <UserContext.Provider value={userContextValues || userInitial}>
          <PokemonContext.Provider
            value={pokemonContextValues || pokemonInitial}
          >
            {node}
          </PokemonContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    ),
  };
};
