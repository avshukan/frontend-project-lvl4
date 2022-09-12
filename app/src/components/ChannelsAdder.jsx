import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Button, Modal, ModalTitle } from 'react-bootstrap';
import { object, string } from 'yup';
import useAuth from '../context/useAuth';

function ChannelsAdder() {
  const { socket } = useAuth();

  // const { channels, currentChannelId } = useSelector((state) => state.data);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  const onSubmit = (values) => {
    socket.emit('newChannel', values);
    handleClose();
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleShow}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <ModalTitle>Добавить канал</ModalTitle>
        </Modal.Header>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={object({ name: string() })}
          onSubmit={onSubmit}
        >
          <Form>
            <Modal.Body>
              <Field id="name" name="name" type="text" />
              <ErrorMessage name="name" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Отменить</Button>
              <Button variant="primary" type="submit">Отправить</Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

export default ChannelsAdder;
