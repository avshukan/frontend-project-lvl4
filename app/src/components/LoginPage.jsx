import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import routes from '../routes/routes';
import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

const LoginPage = () => {
    const [feedbackError, setFeedbackError] = useState(null);
    const location = useLocation();
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
            console.log('values', values)
            setFeedbackError(false);
            schema.validate(values)
            .then(async () => {
            const route = routes.loginPath();
            await axios.post(route, {
                username: values.username,
                password: values.password,
            })
                .then(({ data }) => {
                    const { token } = data;
                    localStorage.setItem('userId', JSON.stringify({ token }));
                    auth.logIn();
                    navigate(location.state.from);
                })
                .catch(() => {
                    setFeedbackError(true);
                    ref.current.select();
                });
            })
            .catch((error) => {
                console.error('error', error);
                setFeedbackError(true);
            });
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
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
            <Form.Group>
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
            <Button type="submit" variant="outline-primary">Submit</Button>
        </Form>
    );
};

export default LoginPage;
