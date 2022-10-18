import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button, FormLabel, Modal, ModalTitle,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { object, string } from 'yup';
import { useSocket } from '../../context/SocketProvider';

function CreateChannel({ onHide }) {
  const deniedChannelsNames = useSelector((state) => state
    .channels
    .channels
    .map(({ name }) => name));

  const { t } = useTranslation();

  const { emitNewChannel } = useSocket();

  const ref = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const onSubmit = (newChannel) => {
    emitNewChannel(newChannel);
    onHide();
  };

  useEffect(() => ref.current?.focus(), [showModal]);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <ModalTitle>{t('channelAdder.add')}</ModalTitle>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={object({
          name: string()
            .required(t('channelAdder.validation.required'))
            .min(3, 'channelAdder.validation.wrongLength')
            .max(20, 'channelAdder.validation.wrongLength')
            .notOneOf(deniedChannelsNames, t('channelAdder.validation.notOneOf')),
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <Modal.Body>
            <FormLabel htmlFor="name" className="visually-hidden">{t('channelAdder.name')}</FormLabel>
            <Field className="w-100" innerRef={ref} id="name" name="name" type="text" />
            <ErrorMessage name="name">{t}</ErrorMessage>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>{t('channelAdder.cancel')}</Button>
            <Button variant="primary" type="submit">{t('channelAdder.save')}</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
}

export default CreateChannel;
