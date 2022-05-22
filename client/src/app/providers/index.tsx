import compose from 'compose-function';
import { withRouter } from './withRouter';
import { withUserContext } from './withUserContext';
import { withPokemonContext } from './withPokemonContext';

export const withProviders = compose(
  withRouter,
  withUserContext,
  withPokemonContext
);
