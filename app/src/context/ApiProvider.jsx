import React, {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  addChannel, removeChannel, renameChannel, switchChannel,
} from '../slices/channelsSlice';
import { addMessage, removeMessagesByChannelId } from '../slices/messagesSlice';

const socket = io({ autoConnect: false });

const ApiContext = createContext({});

function ApiProvider({ children }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const actions = {
    create: {
      action: 'newChannel',
      toastLoading: 'modalChannelAdder.toast.loading',
      toastSuccess: 'channelAdder.toast.success',
      toastError: 'channelAdder.toast.error',
      callback: ({ id }) => dispatch(switchChannel({ channelId: id })),
    },
    rename: {
      action: 'renameChannel',
      toastLoading: 'modalChannelRenamer.toast.loading',
      toastSuccess: 'modalChannelRenamer.toast.success',
      toastError: 'modalChannelRenamer.toast.error',
      callback: () => { },
    },
    remove: {
      action: 'removeChannel',
      toastLoading: 'modalChannelRemover.toast.loading',
      toastSuccess: 'modalChannelRemover.toast.success',
      toastError: 'modalChannelRemover.toast.error',
      callback: () => { },
    },
  };

  const emitActionChannel = ({
    action, toastLoading, toastSuccess, toastError, callback,
  }) => (info) => {
    const { name } = info;
    const toastId = toast.loading(t(toastLoading));
    socket.emit(action, info, ({ status, data }) => {
      if (status === 'ok') {
        toast.update(toastId, {
          render: t(toastSuccess, { name }), type: 'success', isLoading: false, autoClose: 3000,
        });
        callback(data);
      } else {
        toast.update(toastId, {
          render: t(toastError, { name }), type: 'error', isLoading: false, autoClose: 3000,
        });
      }
    });
  };

  const apiConnect = () => socket.connect();

  const apiDisconnect = () => socket.disconnect();

  const apiNewChannel = emitActionChannel(actions.create);

  const apiRenameChannel = emitActionChannel(actions.rename);

  const apiRemoveChannel = emitActionChannel(actions.remove);

  const apiCreateMessage = (data) => socket.emit('newMessage', data);

  useEffect(() => {
    socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
    socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
      dispatch(removeMessagesByChannelId(payload));
    });
    socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
  }, [dispatch]);

  const value = useMemo(() => ({
    apiConnect, apiDisconnect, apiNewChannel, apiRenameChannel, apiRemoveChannel, apiCreateMessage,
  }), [apiNewChannel, apiRenameChannel, apiRemoveChannel]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);

export default ApiProvider;
