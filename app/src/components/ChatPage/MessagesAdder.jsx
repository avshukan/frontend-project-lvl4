import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useApi } from '../../context/ApiProvider';
import { useAuth } from '../../context/AuthProvider';
import { currentChannelIdSelector } from '../../slices';

function MainPage({ canAddMessage }) {
  const { apiCreateMessage } = useApi();

  const currentChannelId = useSelector(currentChannelIdSelector);

  const { t } = useTranslation();

  const { user: { username } } = useAuth();

  const [textMessage, setTextMessage] = useState('');

  const ref = useRef();

  const onChange = () => (event) => {
    setTextMessage(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (textMessage) {
      const newMessage = { body: filter.clean(textMessage), channelId: currentChannelId, username };
      apiCreateMessage(newMessage);
      setTextMessage('');
    }
    ref.current.focus();
  };

  useEffect(() => {
    if (canAddMessage) {
      ref.current.focus();
    }
  }, [canAddMessage, currentChannelId]);

  return !canAddMessage
    ? null
    : (
      <div className="mt-auto px-5 py-3">
        <form noValidate="" className="py-1 border rounded-2" onSubmit={onSubmit}>
          <div className="input-group has-validation">
            <input
              name="body"
              aria-label={t('messageAdder.ariaLabel')}
              placeholder={t('messageAdder.placeholder')}
              className="border-0 p-0 ps-2 form-control"
              value={textMessage}
              onChange={onChange()}
              ref={ref}
            />
            <button type="submit" className="btn btn-group-vertical" disabled="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">{t('messageAdder.send')}</span>
            </button>
          </div>
        </form>
      </div>
    );
}

export default MainPage;
