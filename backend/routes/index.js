const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');
const validator = require('validator');
const {
  createUser, login, clearCookie,
} = require('../controllers/auth');
const BadRequestError = require('../errors/badRequest');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Неправильный формат ссылки');
  }
  return value;
};

router.post('/signup', celebrate({
  body: {
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
}), createUser);
router.post('/signin', celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
}), login);
router.get('/signout', clearCookie);

module.exports = router;
