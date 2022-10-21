import React, {
  createContext, useContext, useMemo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';

const ApiContext = createContext({});

function ApiProvider({ children, api }) {
  const { t } = useTranslation();

  const apiConnect = useCallback(() => api.apiConnect(), [api]);

  const apiDisconnect = useCallback(() => api.apiDisconnect(), [api]);

  const apiCreateChannel = useCallback((data) => api.apiNewChannel(t)(data), [api, t]);

  const apiRenameChannel = useCallback((data) => api.apiRenameChannel(t)(data), [api, t]);

  const apiRemoveChannel = useCallback((data) => api.apiRemoveChannel(t)(data), [api, t]);

  const apiCreateMessage = useCallback((data) => api.apiCreateMessage(data), [api]);

  const value = useMemo(() => ({
    apiConnect,
    apiDisconnect,
    apiCreateChannel,
    apiRenameChannel,
    apiRemoveChannel,
    apiCreateMessage,
  }), [
    apiConnect,
    apiDisconnect,
    apiCreateChannel,
    apiRenameChannel,
    apiRemoveChannel,
    apiCreateMessage,
  ]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);

export default ApiProvider;
