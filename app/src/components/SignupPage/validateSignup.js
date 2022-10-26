import * as yup from 'yup';

const validateUsername = (value, callback) => yup
  .string()
  .required('signupPage.errors.username.required')
  .min(3, 'signupPage.errors.username.wrongLength')
  .max(20, 'signupPage.errors.username.wrongLength')
  .validate(value)
  .then(() => callback({ username: '' }))
  .catch((error) => callback({ username: error.message }));

const validatePasswords = (values, callback) => yup
  .object({
    password: yup.string()
      .required('signupPage.errors.password.required')
      .min(6, 'signupPage.errors.password.wrongLength'),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'signupPage.errors.passwordConfirmation.notMatch'),
  })
  .nullable()
  .validate(values, { abortEarly: false })
  .then(() => callback({ password: '', passwordConfirmation: '' }))
  .catch((error) => {
    const newFeedbackError = error.inner.reduce((acc, { path, message }) => ({
      ...acc,
      [path]: message,
    }), {});
    callback({ password: '', passwordConfirmation: '', ...newFeedbackError });
  });

const validateSignup = (id, values, callback) => (id === 'username'
  ? validateUsername(values, callback)
  : validatePasswords(values, callback));

export default validateSignup;
