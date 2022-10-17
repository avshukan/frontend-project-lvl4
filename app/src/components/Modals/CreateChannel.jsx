import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Button, FormLabel, Modal, ModalTitle,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { object, string } from 'yup';
import { useAuth } from '../../context/AuthProvider';
import { switchChannel } from '../../slices/dataSlice';

function CreateChannel({ onHide }) {
  const dispatch = useDispatch();

  const deniedChannelsNames = useSelector((state) => state.data.channels.map(({ name }) => name));

  const { t } = useTranslation();

  const { socket } = useAuth();

  const ref = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const onSubmit = (values) => {
    socket.emit('newChannel', values, ({ status, data: { id } }) => {
      if (status === 'ok') {
        toast.info(t('channelAdder.toast.success', { name: values.name }), { autoClose: 3000 });
        dispatch(switchChannel({ channelId: id }));
      } else {
        toast.error(t('channelAdder.toast.error', { name: values.name }), { autoClose: 3000 });
      }
    });
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
