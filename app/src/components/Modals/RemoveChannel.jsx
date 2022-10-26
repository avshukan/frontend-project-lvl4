import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, Modal, ModalTitle,
} from 'react-bootstrap';
import { useApi } from '../../context/ApiProvider';

function RemoveChannel({ info, onHide }) {
  const { t } = useTranslation();

  const { apiRemoveChannel } = useApi();

  const ref = useRef();

  const onRemove = (event) => {
    event.preventDefault();
    apiRemoveChannel(info);
    onHide();
  };

  useEffect(() => ref.current?.focus(), []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <ModalTitle>{t('modalChannelRemover.title', { name: info.name })}</ModalTitle>
      </Modal.Header>
      <Form onSubmit={onRemove}>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>{t('modalChannelRemover.cancel')}</Button>
          <Button ref={ref} variant="danger" type="submit">{t('modalChannelRemover.remove')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RemoveChannel;
