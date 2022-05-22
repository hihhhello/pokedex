import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from 'shared/lib';
import { ToggleFavPokemon } from '../ui';

describe('<ToggleFavPokemon />', () => {
  let fetchFavPokemonsApiIds: (userId: number) => Promise<void>;

  beforeEach(() => {
    fetchFavPokemonsApiIds = jest.fn();
  });

  test('Renders', () => {
    customRender({
      node: (
        <ToggleFavPokemon
          pokemonData={{
            apiId: 777,
            name: 'test',
            avatarUrl: 'test',
          }}
        />
      ),
      // @ts-ignore
      pokemonContextValues: {
        fetchFavPokemonsApiIds,
      },
      userContextValues: {
        // @ts-ignore
        user: {
          id: 123,
        },
      },
    });

    const element = screen.getByTestId('toggle-fav-pokemon');

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });

  test('Changes checked state', async () => {
    customRender({
      node: (
        <ToggleFavPokemon
          pokemonData={{
            apiId: 777,
            name: 'test',
            avatarUrl: 'test',
          }}
        />
      ),
      // @ts-ignore
      pokemonContextValues: {
        fetchFavPokemonsApiIds,
      },
      userContextValues: {
        // @ts-ignore
        user: {
          id: 123,
        },
      },
    });

    const element = screen.getByTestId<HTMLInputElement>('toggle-fav-pokemon');
    // eslint-disable-next-line
    const input = element.querySelector('input');
    // @ts-ignore
    expect(input.checked).toBeFalsy();

    // @ts-ignore
    await userEvent.click(input);

    // @ts-ignore
    expect(input.checked).toBeTruthy();

    // @ts-ignore
    await userEvent.click(input);
    // @ts-ignore
    expect(input.checked).toBeFalsy();
  });
});
