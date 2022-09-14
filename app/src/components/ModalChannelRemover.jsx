import React from 'react';
import {
  Button, Form, Modal, ModalTitle,
} from 'react-bootstrap';
import useAuth from '../context/useAuth';

function ModalChannelRemover({ id, name, hideModal }) {
  const { socket } = useAuth();

  const onRemove = () => {
    hideModal();
    socket.emit('removeChannel', { id });
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <ModalTitle>
          Удалить канал
          {name}
          ?
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onRemove}>
          <Button variant="secondary" onClick={hideModal}>Нет, оставить</Button>
          <Button variant="danger" type="submit">Да, удалить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalChannelRemover;
