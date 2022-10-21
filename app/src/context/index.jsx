import React from 'react';
import RollbarProvider from './RollbarProvider';
import ReduxProvider from './ReduxProvider';
import ApiProvider from './ApiProvider';
import I18nProvider from './I18nProvider';
import AuthProvider from './AuthProvider';

function Providers({ children, api }) {
  return (
    <RollbarProvider>
      <ReduxProvider>
        <ApiProvider api={api}>
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
