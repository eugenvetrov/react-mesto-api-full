const Card = require('../models/card');
const ServerError = require('../errors/server');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');
const Forbidden = require('../errors/forbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => {
      next(new ServerError());
    });
};

const createCard = (req, res, next) => {
  const owner = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new BadRequestError(`Поле ${fields} заполнено некорректно. ${err.errors.link}`));
      } else if (err.code === 11000) {
        next(new ConflictError('Данная карточка уже существует в базе данных'));
      } else {
        next(new ServerError());
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      } else { res.send({ data: card }); }
    })
    .catch(() => {
      next(new ServerError());
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        res.send({ data: card });
      }
    })
    .catch(() => {
      next(new ServerError());
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId).then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
    }
    return card;
  })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new Forbidden());
        return null;
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        res.send({ message: 'Карточка удалена' });
      }
    })
    .catch(() => {
      next(new ServerError());
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardById,
};
