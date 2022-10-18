import React from 'react';
import RollbarProvider from './RollbarProvider';
import ReduxProvider from './ReduxProvider';
import SocketProvider from './SocketProvider';
import I18nProvider from './I18nProvider';
import AuthProvider from './AuthProvider';

function Providers({ children }) {
  return (
    <RollbarProvider>
      <ReduxProvider>
        <SocketProvider>
          <I18nProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </I18nProvider>
        </SocketProvider>
      </ReduxProvider>
    </RollbarProvider>
  );
}

export default Providers;
