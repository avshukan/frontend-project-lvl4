import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Button, Form, Modal, ModalTitle,
} from 'react-bootstrap';
import useAuth from '../context/useAuth';

function ModalChannelRemover({ id, name, hideModal }) {
  const { t } = useTranslation();

  const { socket } = useAuth();

  const onRemove = (event) => {
    event.preventDefault();
    const toastId = toast.loading(t('modalChannelRemover.toast.loading'));
    hideModal();
    socket.emit('removeChannel', { id }, ({ status }) => {
      if (status === 'ok') {
        toast.update(toastId, {
          render: t('modalChannelRemover.toast.success', { name }), type: 'success', isLoading: false, autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: t('modalChannelRemover.toast.error', { name }), type: 'error', isLoading: false, autoClose: 3000,
        });
      }
    });
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
