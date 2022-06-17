const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ServerError = require('../errors/server');
const ConflictError = require('../errors/conflict');
const BadRequestError = require('../errors/badRequest');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.validate({
        name, about, avatar, email, password,
      });
      return hash;
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({
        data: {
          name: user.name, about: user.about, avatar: user.avatar, email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new BadRequestError(`Поле ${fields} заполнено некорректно. ${err.errors.email ? err.errors.email : ''}${err.errors.password ? err.errors.password : ''}`));
      } else if (err.code === 11000) {
        next(
          new ConflictError('Данный пользователь уже существует в базе данных'),
        );
      } else {
        next(new ServerError(err.message));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(200).cookie('jwt', token, { httpOnly: true }).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const clearCookie = (req, res, next) => {
  try {
    res.status(403).clearCookie('jwt').send({ message: 'Выход' });
  } catch (err) {
    next(new ServerError());
  }
};

module.exports = {
  createUser,
  login,
  clearCookie,
};
