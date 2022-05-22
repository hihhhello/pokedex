import { userModel } from 'entities/user';
import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { LoadingPage } from 'shared/ui';

const LoginPage = React.lazy(() => import('./login'));
const GithubAuthPage = React.lazy(() => import('./github-auth'));

const pbRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: `/github/auth`,
    element: <GithubAuthPage />,
  },
  {
    path: `*`,
    element: <Navigate to="/" replace />,
  },
];

const MainPage = React.lazy(() => import('./main'));
const UserPage = React.lazy(() => import('./user'));
const PokemonPage = React.lazy(() => import('./pokemon'));

const prRoutes: RouteObject[] = [
  {
    path: `/`,
    element: <MainPage />,
  },
  {
    path: `/:login`,
    element: <UserPage />,
  },
  {
    path: `/pokemon/:name`,
    element: <PokemonPage />,
  },
  {
    path: `*`,
    element: <Navigate to="/" replace />,
  },
];

export const Routes = () => {
  const { user, authorizing } = userModel.context.useUserContext();
  const publicRoutes = useRoutes(pbRoutes);
  const privateRoutes = useRoutes(prRoutes);

  if (authorizing) {
    return <LoadingPage />;
  }

  if (!user) {
    return publicRoutes;
  }

  return privateRoutes;
};
