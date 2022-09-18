import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ModalChannelRenamer from './ModalChannelRenamer';
import ModalChannelRemover from './ModalChannelRemover';

function ChannelMenu({ id, name, variant }) {
  const { t } = useTranslation();

  const [useModalChannelRenamer, setUseModalChannelRenamer] = useState(false);

  const showModalChannelRenamer = () => setUseModalChannelRenamer(true);

  const hideModalChannelRenamer = () => setUseModalChannelRenamer(false);

  const [useModalChannelRemover, setUseModalChannelRemover] = useState(false);

  const showModalChannelRemover = () => setUseModalChannelRemover(true);

  const hideModalChannelRemover = () => setUseModalChannelRemover(false);

  return (
    <>
      <Dropdown.Toggle active variant={variant} style={{ width: '30px', flexGrow: 0 }} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={showModalChannelRenamer}>{t('channelMenu.rename')}</Dropdown.Item>
        <Dropdown.Item onClick={showModalChannelRemover}>{t('channelMenu.remove')}</Dropdown.Item>
      </Dropdown.Menu>
      {useModalChannelRenamer
        ? <ModalChannelRenamer id={id} name={name} hideModal={hideModalChannelRenamer} />
        : null}
      {useModalChannelRemover
        ? <ModalChannelRemover id={id} name={name} hideModal={hideModalChannelRemover} />
        : null}
    </>
  );
}

export default ChannelMenu;
