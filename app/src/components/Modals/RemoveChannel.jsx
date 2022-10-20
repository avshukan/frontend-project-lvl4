import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, Modal, ModalTitle,
} from 'react-bootstrap';
import { useApi } from '../../context/ApiProvider';

function RemoveChannel({ info, onHide }) {
  const { t } = useTranslation();

  const { emitRemoveChannel } = useApi();

  const onRemove = (event) => {
    event.preventDefault();
    emitRemoveChannel(info);
    onHide();
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <ModalTitle>{t('modalChannelRemover.title', { name: info.name })}</ModalTitle>
      </Modal.Header>
      <Form onSubmit={onRemove}>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>{t('modalChannelRemover.cancel')}</Button>
          <Button variant="danger" type="submit">{t('modalChannelRemover.remove')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RemoveChannel;
