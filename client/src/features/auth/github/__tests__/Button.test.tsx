import { screen } from '@testing-library/react';
import { customRender } from 'shared/lib';
import { GithubAuthButton } from '../ui';

describe('<GithubAuthButton />', () => {
  test('Renders', () => {
    // @ts-ignore
    customRender({
      node: <GithubAuthButton />,
    });

    const element = screen.getByTestId('github-auth-btn');

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
});
