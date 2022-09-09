import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../context/useAuth';
import routes from '../routes/routes';
import queryString from '../routes/queryString';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

function LoginPage() {
  const [feedbackError, setFeedbackError] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();
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
          auth.logIn(token);
          auth.setUsername(values.username);
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
        <Card.Title style={{ textAlign: 'center' }}>Авторизация</Card.Title>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="my-4">
            <Form.Label htmlFor="username">Username</Form.Label>
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
            <Form.Label htmlFor="password">Password</Form.Label>
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
            <div className="invalid-feedback active show" style={{ display: feedbackError ? 'block' : 'none' }}>the username or password is incorrect</div>
          </Form.Group>
          <Button type="submit" variant="outline-primary" style={{ width: '100%' }}>Submit</Button>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">Регистрация</Card.Footer>
    </Card>
  );
}

export default LoginPage;
