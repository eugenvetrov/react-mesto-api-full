const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');
const validator = require('validator');
const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardById,
} = require('../controllers/cards');
const BadRequestError = require('../errors/badRequest');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Неправильный формат ссылки');
  }
  return value;
};

router.get('/', getCards);
router.post('/', celebrate({
  body: {
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(validateURL).required(),
  },
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().length(24).hex().required(),
  },
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().length(24).hex().required(),
  },
}), dislikeCard);
router.delete('/:cardId', celebrate({
  params: {
    cardId: Joi.string().length(24).hex().required(),
  },
}), deleteCardById);

module.exports = router;
