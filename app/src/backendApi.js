import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import store from './slices';
import {
  addChannel, removeChannel, renameChannel, switchChannel,
} from './slices/channelsSlice';
import { addMessage, removeMessagesByChannelId } from './slices/messagesSlice';

const socket = io({ autoConnect: false });

function backendApi() {
  const { dispatch } = store;

  socket.on('newChannel', (payload) => dispatch(addChannel(payload)));

  socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));

  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
    dispatch(removeMessagesByChannelId(payload));
  });

  socket.on('newMessage', (payload) => dispatch(addMessage(payload)));

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
  }) => (translationFunction) => (info) => {
    const { name } = info;
    const toastId = toast.loading(translationFunction(toastLoading));
    socket.emit(action, info, ({ status, data }) => {
      if (status === 'ok') {
        toast.update(toastId, {
          render: translationFunction(toastSuccess, { name }), type: 'success', isLoading: false, autoClose: 3000,
        });
        callback(data);
      } else {
        toast.update(toastId, {
          render: translationFunction(toastError, { name }), type: 'error', isLoading: false, autoClose: 3000,
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

  return {
    apiConnect, apiDisconnect, apiNewChannel, apiRenameChannel, apiRemoveChannel, apiCreateMessage,
  };
}

export default backendApi;
