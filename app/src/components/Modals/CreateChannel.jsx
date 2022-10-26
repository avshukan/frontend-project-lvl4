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

function CreateChannel({ onHide }) {
  const deniedChannelsNames = useChannels().map(({ name }) => name);

  const { t } = useTranslation();

  const { apiCreateChannel } = useApi();

  const innerRef = useRef(null);

  const onSubmit = (newChannel) => {
    apiCreateChannel(newChannel);
    onHide();
  };

  useEffect(() => innerRef.current?.focus(), []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <ModalTitle>{t('channelAdder.add')}</ModalTitle>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={object({
          name: string()
            .test({
              test: (name, ctx) => {
                if (name !== filter.clean(name)) {
                  return ctx.createError({ message: 'channelAdder.validation.profanityFilter' });
                }
                return true;
              },
            })
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
            <Field className="w-100" innerRef={innerRef} id="name" name="name" type="text" />
            <ErrorMessage name="name">{t}</ErrorMessage>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>{t('channelAdder.cancel')}</Button>
            <Button variant="primary" type="submit">{t('channelAdder.save')}</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
}

export default CreateChannel;
