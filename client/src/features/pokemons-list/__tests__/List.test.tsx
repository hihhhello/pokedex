import { screen } from '@testing-library/react';
import { customRender } from 'shared/lib';
import { List } from '../ui';

describe('<PokemonsList />', () => {
  test('Renders', () => {
    customRender({
      node: <List />,
    });

    const element = screen.getByTestId('pokemons-list-paper');

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
});
