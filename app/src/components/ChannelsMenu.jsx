import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import ModalChannelRemover from './ModalChannelRemover';

function ChannelsMenu({ id, name, variant }) {
  const [useModalChannelRemover, setUseModalChannelRemover] = useState(false);

  const showModalChannelRemover = () => setUseModalChannelRemover(true);

  const hideModalChannelRemover = () => setUseModalChannelRemover(false);

  return (
    <>
      <Dropdown.Toggle active variant={variant} style={{ width: '30px', flexGrow: 0 }} />
      <Dropdown.Menu>
        <Dropdown.Item>Переименовать</Dropdown.Item>
        <Dropdown.Item onClick={showModalChannelRemover}>Удалить</Dropdown.Item>
      </Dropdown.Menu>
      {useModalChannelRemover
        ? <ModalChannelRemover id={id} name={name} hideModal={hideModalChannelRemover} />
        : null}
    </>
  );
}

export default ChannelsMenu;
