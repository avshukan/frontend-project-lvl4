import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import routes from '../routes/routes';
import queryString from '../routes/queryString';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { fetchData } from '../slices/dataSlice';

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

const LoginPage = () => {
    const dispatch = useDispatch();
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
            setFeedbackError(false);
            const route = routes.loginPath();
            await schema
                .validate(values)
                .then(() => {
                    return axios.post(route, {
                        username: values.username,
                        password: values.password,
                    })
                })
                .then(({ data: { token } }) => {
                    auth.logIn(token);
                    // dispatch(fetchData(token));
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
