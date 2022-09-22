import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const { REACT_APP_ROLLBAR_TOKEN } = process.env;

const rollbarConfig = {
  accessToken: REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

function RollbarProvider({ children }) {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Provider>
  );
}

export default RollbarProvider;
