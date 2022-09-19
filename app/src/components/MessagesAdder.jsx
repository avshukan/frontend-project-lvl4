import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../context/useAuth';

function MainPage() {
  const auth = useAuth();
  const { socket, username } = auth;
  const { currentChannelId } = useSelector((state) => state.data);
  const [textMessage, setTextMessage] = useState('');

  const ref = useRef();

  const onChange = () => (event) => {
    setTextMessage(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newMessage = { body: textMessage, channelId: currentChannelId, username };
    socket.emit('newMessage', newMessage);
    setTextMessage('');
    ref.current.focus();
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate="" className="py-1 border rounded-2" onSubmit={onSubmit}>
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value={textMessage}
            onChange={onChange()}
            ref={ref}
          />
          <button type="submit" className="btn btn-group-vertical" disabled="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default MainPage;
