const queryStringPath = '';

const queryString = {
  loginPath: () => [queryStringPath, 'login'].join('/'),
  chatPath: () => [queryStringPath, ''].join('/'),
  errorPath: () => '*',
};

export default queryString;
