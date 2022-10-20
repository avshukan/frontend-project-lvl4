import React from 'react';
import RollbarProvider from './RollbarProvider';
import ReduxProvider from './ReduxProvider';
import ApiProvider from './ApiProvider';
import I18nProvider from './I18nProvider';
import AuthProvider from './AuthProvider';

function Providers({ children, backend }) {
  return (
    <RollbarProvider>
      {console.log('backend', backend)}
      <ReduxProvider>
        <ApiProvider>
          <I18nProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </I18nProvider>
        </ApiProvider>
      </ReduxProvider>
    </RollbarProvider>
  );
}

export default Providers;
