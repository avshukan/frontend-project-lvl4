import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../context/useAuth';
import routes from '../routes/routes';
import queryString from '../routes/queryString';

const schema = yup.object().shape({
  username: yup.string()
    .required('signupPage.errors.username.required')
    .min(3, 'signupPage.errors.username.wrongLength')
    .max(20, 'signupPage.errors.username.wrongLength'),
  password: yup.string()
    .required('signupPage.errors.password.required')
    .min(6, 'signupPage.errors.password.wrongLength'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'signupPage.errors.passwordConfirmation.notMatch'),
});

function SignupPage() {
  const rollbar = useRollbar();

  const { t } = useTranslation();

  const auth = useAuth();

  const [feedbackError, setFeedbackError] = useState({});

  const navigate = useNavigate();

  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setFeedbackError({});
      const route = routes.signupPath();
      await schema
        .validate(values, { abortEarly: false })
        .then(() => axios.post(route, {
          username: values.username,
          password: values.password,
        }))
        .then(({ data: { token } }) => {
          auth.logIn(values.username, token);
          navigate(queryString.chatPath());
        })
        .catch((error) => {
          if (error.errors) {
            const newFeedbackError = error.inner.reduce((acc, { path, message }) => ({
              ...acc,
              [path]: message,
            }), {});
            setFeedbackError(newFeedbackError);
          }
          rollbar.error('Error on signup', error, values);
          ref.current.select();
        });
    },
  });

  return (
    <Card style={{ width: '300px', margin: 'auto' }}>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>{t('signupPage.title')}</Card.Title>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="my-4">
            <Form.Label htmlFor="username">{t('signupPage.username')}</Form.Label>
            <Form.Control
              ref={ref}
              id="username"
              placeholder={t('signupPage.username')}
              name="username"
              autoComplete="username"
              required
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={!!feedbackError.username}
            />
            {feedbackError.username && <div className="invalid-feedback active show">{t(feedbackError.username)}</div>}
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Label htmlFor="password">{t('signupPage.password')}</Form.Label>
            <Form.Control
              id="password"
              placeholder={t('signupPage.password')}
              name="password"
              autoComplete="current-password"
              required
              className="form-control"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={!!feedbackError.password}
            />
            {feedbackError.password && <div className="invalid-feedback active show">{t(feedbackError.password)}</div>}
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Label htmlFor="passwordConfirmation">{t('signupPage.passwordConfirmation')}</Form.Label>
            <Form.Control
              id="passwordConfirmation"
              placeholder={t('signupPage.passwordConfirmation')}
              name="passwordConfirmation"
              autoComplete="current-password"
              required
              className="form-control"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirmation}
              isInvalid={!!feedbackError.passwordConfirmation}
            />
            {feedbackError.passwordConfirmation && <div className="invalid-feedback active show">{t(feedbackError.passwordConfirmation)}</div>}
          </Form.Group>
          <Button type="submit" variant="outline-primary" style={{ width: '100%' }}>{t('signupPage.signup')}</Button>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
        <Link to={queryString.loginPath()}>{t('signupPage.toLogin')}</Link>
      </Card.Footer>
    </Card>
  );
}

export default SignupPage;
