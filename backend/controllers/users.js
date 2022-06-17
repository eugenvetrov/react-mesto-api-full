const User = require('../models/user');
const ServerError = require('../errors/server');
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => next(new ServerError()));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => {
      next(new ServerError());
    });
};

const checkUser = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
    } else {
      res.send({ data: user });
    }
  }).catch(() => {
    next(new ServerError());
  });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new BadRequestError(`Поле ${fields} заполнено некорректно`));
      } else {
        next(new ServerError());
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${err.errors.avatar}`));
      } else {
        next(new ServerError());
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  checkUser,
  updateUser,
  updateUserAvatar,
};
