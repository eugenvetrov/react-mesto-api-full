const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Unauthorized('Необходима авторизация'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      next(new Unauthorized('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};
