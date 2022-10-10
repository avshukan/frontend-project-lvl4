const queryStringPath = '';

const queryString = {
  indexPath: () => [queryStringPath, ''].join('/'),
  signupPath: () => [queryStringPath, 'signup'].join('/'),
  loginPath: () => [queryStringPath, 'login'].join('/'),
  chatPath: () => [queryStringPath, ''].join('/'),
  errorPath: () => '*',
  aboutPath: () => [queryStringPath, 'about'].join('/'),
};

export default queryString;
