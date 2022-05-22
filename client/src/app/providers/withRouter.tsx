import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingPage } from 'shared/ui';

export const withRouter = (component: () => React.ReactNode) => () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <Suspense fallback={<LoadingPage />}>{component()}</Suspense>
    </BrowserRouter>
  );
};
