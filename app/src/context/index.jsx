import React from 'react';
import RollbarProvider from './RollbarProvider';
import ReduxProvider from './ReduxProvider';
import I18nProvider from './I18nProvider';
import AuthProvider from './AuthProvider';

function Providers({ children }) {
  return (
    <RollbarProvider>
      <ReduxProvider>
        <I18nProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </I18nProvider>
      </ReduxProvider>
    </RollbarProvider>
  );
}

export default Providers;
