const queryStringPath = '';

const queryString = {
  signupPath: () => [queryStringPath, 'signup'].join('/'),
  loginPath: () => [queryStringPath, 'login'].join('/'),
  chatPath: () => [queryStringPath, ''].join('/'),
  errorPath: () => '*',
};

export default queryString;
