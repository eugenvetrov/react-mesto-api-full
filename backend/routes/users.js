const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');
const validator = require('validator');
const {
  getUsers,
  getUserById,
  checkUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const BadRequestError = require('../errors/badRequest');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Неправильный формат ссылки');
  }
  return value;
};

router.get('/', getUsers);
router.get('/me', checkUser);
router.get('/:userId', celebrate({
  params: {
    userId: Joi.string().length(24).hex().required(),
  },
}), getUserById);
router.patch('/me', celebrate({
  body: {
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  },
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().custom(validateURL).required(),
  },
}), updateUserAvatar);

module.exports = router;
