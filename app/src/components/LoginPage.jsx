import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../context/useAuth';
import routes from '../routes/routes';
import queryString from '../routes/queryString';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

function LoginPage() {
  const { t } = useTranslation();

  const auth = useAuth();

  const [feedbackError, setFeedbackError] = useState(null);

  const navigate = useNavigate();

  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setFeedbackError(false);
      const route = routes.loginPath();
      await schema
        .validate(values)
        .then(() => axios.post(route, {
          username: values.username,
          password: values.password,
        }))
        .then(({ data: { token } }) => {
          auth.logIn(values.username, token);
          navigate(queryString.chatPath());
        })
        .catch((error) => {
          console.error('error', error);
          setFeedbackError(true);
          ref.current.select();
        });
    },
  });

  return (
    <Card style={{ width: '300px', margin: 'auto' }}>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>{t('loginPage.title')}</Card.Title>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="my-4">
            <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
            <Form.Control
              ref={ref}
              id="username"
              placeholder="username"
              name="username"
              autoComplete="username"
              required
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={feedbackError}
            />
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
            <Form.Control
              id="password"
              placeholder="password"
              name="password"
              autoComplete="current-password"
              required
              className="form-control"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={feedbackError}
            />
            <div className="invalid-feedback active show" style={{ display: feedbackError ? 'block' : 'none' }}>{t('loginPage.errors.invalidPassword')}</div>
          </Form.Group>
          <Button type="submit" variant="outline-primary" style={{ width: '100%' }}>{t('loginPage.login')}</Button>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
        <Link to={queryString.signupPath()}>{t('loginPage.toSignup')}</Link>
      </Card.Footer>
    </Card>
  );
}

export default LoginPage;
