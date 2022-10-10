import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import {
  Button, Card, Container, Form,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../context/useAuth';
import routes from '../routes/routes';
import queryString from '../routes/queryString';

function SignupPage() {
  const rollbar = useRollbar();

  const { t } = useTranslation();

  const auth = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
  });

  const [feedbackError, setFeedbackError] = useState({});

  const [signupError, setSignupError] = useState('');

  const ref = useRef();

  const validateUsername = (value) => yup
    .string()
    .required('signupPage.errors.username.required')
    .min(3, 'signupPage.errors.username.wrongLength')
    .max(20, 'signupPage.errors.username.wrongLength')
    .validate(value)
    .then(() => setFeedbackError({ ...feedbackError, username: '' }))
    .catch((error) => setFeedbackError({ ...feedbackError, username: error.message }));

  const validatePasswords = (values) => yup
    .object({
      password: yup.string()
        .required('signupPage.errors.password.required')
        .min(6, 'signupPage.errors.password.wrongLength'),
      passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'signupPage.errors.passwordConfirmation.notMatch'),
    })
    .validate(values, { abortEarly: false })
    .then(() => setFeedbackError({ ...feedbackError, password: '', passwordConfirmation: '' }))
    .catch((error) => {
      const newFeedbackError = error.inner.reduce((acc, { path, message }) => ({
        ...acc,
        [path]: message,
      }), {});
      setFeedbackError({
        ...feedbackError, password: '', passwordConfirmation: '', ...newFeedbackError,
      });
    });

  const validate = (id, value) => (id === 'username'
    ? validateUsername(value)
    : validatePasswords({ ...data, [id]: value }));

  const handleChange = (event) => {
    event.preventDefault();
    const { target: { id, value } } = event;
    setSignupError('');
    setData((oldData) => ({ ...oldData, [id]: value }));
    validate(id, value);
  };

  const handleBlur = (event) => {
    event.preventDefault();
    const { target: { id } } = event;
    validate(id, data[id]);
  };

  const hasFeedbackError = () => Object
    .values(feedbackError)
    .reduce((acc, value) => acc || !!value, false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (hasFeedbackError()) {
      return;
    }
    const { username, password } = data;
    axios.post(routes.signupPath(), { username, password })
      .then(({ data: { token } }) => {
        auth.logIn(username, token);
        navigate(queryString.chatPath());
      })
      .catch((error) => {
        setSignupError(error.message);
        rollbar.error('Error on signup', error, { username, password });
        ref.current.select();
      });
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <Container className="h-100 w-100 d-flex align-content-center justify-content-center">
      <Card style={{ width: '300px', margin: 'auto' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{t('signupPage.title')}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-4">
              <Form.Label htmlFor="username">{t('signupPage.username')}</Form.Label>
              <Form.Control
                ref={ref}
                id="username"
                placeholder={t('signupPage.username')}
                name="username"
                autoComplete="username"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={data.username}
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
                className="form-control"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={data.password}
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
                className="form-control"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={data.passwordConfirmation}
                isInvalid={!!feedbackError.passwordConfirmation}
              />
              {feedbackError.passwordConfirmation && <div id="a" className="invalid-feedback active show">{t(feedbackError.passwordConfirmation)}</div>}
            </Form.Group>
            <Button type="submit" variant="outline-primary" style={{ width: '100%' }}>{t('signupPage.signup')}</Button>
            {signupError && <div id="b" className="invalid-feedback active show d-block">{signupError}</div>}
          </Form>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <Link to={queryString.loginPath()}>{t('signupPage.toLogin')}</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default SignupPage;
