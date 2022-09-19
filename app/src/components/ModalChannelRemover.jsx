import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, Modal, ModalTitle,
} from 'react-bootstrap';
import useAuth from '../context/useAuth';

function ModalChannelRemover({ id, name, hideModal }) {
  const { t } = useTranslation();

  const { socket } = useAuth();

  const onRemove = (event) => {
    event.preventDefault();
    hideModal();
    socket.emit('removeChannel', { id });
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <ModalTitle>{t('modalChannelRemover.title', { name })}</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onRemove}>
          <Button variant="secondary" onClick={hideModal}>{t('modalChannelRemover.cancel')}</Button>
          <Button variant="danger" type="submit">{t('modalChannelRemover.remove')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalChannelRemover;
