const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env ? process.env : { NODE_ENV: '', JWT_SECRET: 'our_little_secret' };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Unauthorized('Необходима авторизация'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'our_little_secret');
    } catch (err) {
      next(new Unauthorized('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};
