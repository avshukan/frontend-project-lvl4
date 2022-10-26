import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, FormLabel, Modal, ModalTitle,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { object, string } from 'yup';
import filter from 'leo-profanity';
import { useApi } from '../../context/ApiProvider';
import { useChannels } from '../../slices';

function RenameChannel({ info: { id, name }, onHide }) {
  const deniedChannelsNames = useChannels().map(({ name: channelName }) => channelName);

  const { apiRenameChannel } = useApi();

  const { t } = useTranslation();

  const ref = useRef(null);

  const onRename = (values, actions) => {
    apiRenameChannel({ id, name: values.newname });
    onHide();
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
            .test({
              test: (text, ctx) => {
                if (text !== filter.clean(text)) {
                  return ctx.createError({ message: 'modalChannelRenamer.validation.profanityFilter' });
                }
                return true;
              },
            })
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
