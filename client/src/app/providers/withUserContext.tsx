import React from 'react';
import { userModel } from 'entities/user';

export const withUserContext = (component: () => React.ReactNode) => () => {
  const { UserContextProvider } = userModel.context;
  return <UserContextProvider>{component()}</UserContextProvider>;
};
