import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, FormLabel, Modal, ModalTitle,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { object, string } from 'yup';
import useAuth from '../context/useAuth';

function ModalChannelRemover({ id, name, hideModal }) {
  const { socket } = useAuth();

  const deniedChannelsNames = useSelector((state) => state.data.channels
    .map(({ name: channelName }) => channelName)
    .filter((channelName) => channelName !== name));

  const ref = useRef(null);

  const onRename = (values, actions) => {
    const { newname } = values;
    hideModal();
    socket.emit('renameChannel', { id, name: newname });
    actions.setSubmitting(false);
  };

  useEffect(() => ref.current?.focus());

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <ModalTitle>
          Переименовать канал
          {name}
        </ModalTitle>
      </Modal.Header>
      <Formik
        initialValues={{ newname: name }}
        validationSchema={object({
          newname: string()
            .required()
            .notOneOf(deniedChannelsNames),
        })}
        onSubmit={onRename}
      >
        <Form>
          <Modal.Body>
            <FormLabel htmlFor="newname" className="visually-hidden">Имя канала</FormLabel>
            <Field innerRef={ref} id="newname" name="newname" type="text" />
            <ErrorMessage name="newname" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal}>Отменить</Button>
            <Button variant="primary" type="submit">Переименовать</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
}

export default ModalChannelRemover;
