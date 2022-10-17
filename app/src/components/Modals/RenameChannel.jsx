import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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

function RenameChannel({ info: { id, name }, onHide }) {
  const deniedChannelsNames = useSelector((state) => state.data.channels
    .map(({ name: channelName }) => channelName));

  const { t } = useTranslation();

  const { socket } = useAuth();

  const ref = useRef(null);

  const onRename = (values, actions) => {
    const { newname } = values;
    const toastId = toast.loading(t('modalChannelRenamer.toast.loading'));
    onHide();
    socket.emit('renameChannel', { id, name: newname }, ({ status }) => {
      if (status === 'ok') {
        toast.update(toastId, {
          render: t('modalChannelRenamer.toast.success', { name: values.newname }), type: 'success', isLoading: false, autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: t('modalChannelRenamer.toast.error', { name: values.newname }), type: 'error', isLoading: false, autoClose: 3000,
        });
      }
    });
    actions.setSubmitting(false);
  };

  useEffect(() => ref.current?.focus());

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <ModalTitle>{t('modalChannelRenamer.title', { name })}</ModalTitle>
      </Modal.Header>
      <Formik
        initialValues={{ newname: name }}
        validationSchema={object({
          newname: string()
            .trim()
            .required(t('modalChannelRenamer.validation.required'))
            .min(3, 'modalChannelRenamer.validation.wrongLength')
            .max(20, 'modalChannelRenamer.validation.wrongLength')
            .notOneOf(deniedChannelsNames, t('modalChannelRenamer.validation.notOneOf')),
        })}
        onSubmit={onRename}
      >
        <Form>
          <Modal.Body>
            <FormLabel htmlFor="newname" className="visually-hidden">{t('modalChannelRenamer.name')}</FormLabel>
            <Field className="w-100" innerRef={ref} id="newname" name="newname" type="text" />
            <ErrorMessage name="newname">{t}</ErrorMessage>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>{t('modalChannelRenamer.cancel')}</Button>
            <Button variant="primary" type="submit">{t('modalChannelRenamer.save')}</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
}

export default RenameChannel;
