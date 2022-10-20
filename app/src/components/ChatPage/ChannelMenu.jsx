import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { showModal } from '../../slices/modalsSlice';

function ChannelMenu({ id, name, variant }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const showModalChannel = (type) => () => dispatch(showModal({ type, info: { id, name } }));

  return (
    <>
      <Dropdown.Toggle active variant={variant} className="app-dropdown-toggle" style={{ width: 30, flexGrow: 0 }}>
        <span className="visually-hidden">{t('channelMenu.title')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={showModalChannel('rename')}>{t('channelMenu.rename')}</Dropdown.Item>
        <Dropdown.Item onClick={showModalChannel('remove')}>{t('channelMenu.remove')}</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
}

export default ChannelMenu;
