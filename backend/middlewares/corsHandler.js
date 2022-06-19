module.exports = (req, res, next) => {
  const allowedCors = [
    'https://evg.vetrow.mesto.nomoreparties.sbs/',
    'http://evg.vetrow.mesto.nomoreparties.sbs/',
    'localhost:3000',
  ];

  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};
