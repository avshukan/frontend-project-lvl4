import React from 'react';
import AuthProvider from './AuthProvider';
import I18nProvider from './I18nProvider';
import ReduxProvider from './ReduxProvider';

function Providers({ children }) {
  return (
    <ReduxProvider>
      <I18nProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </I18nProvider>
    </ReduxProvider>
  );
}

export default Providers;
