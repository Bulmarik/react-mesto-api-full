const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validCreateUser = celebrate({
  body: {
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Некорректная ссылка');
      }),
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value, {require_protocol: true})) {
          return value;
        }
        return helpers.message('Некорректный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Минимум 8 символов',
        'any.required': 'Обязательное поле',
      }),
  },
});

const validCreateCard = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
    link: Joi.string()
      .custom((value, helper) => {
        if (validator.isURL(value, {require_protocol: true})) {
          return value;
        }
        return helper.message('Некорректная ссылка');
      }),
  },
});

const validPatchUser = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
  },
});

const validPatchAvatar = celebrate({
  body: {
    avatar: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value, {require_protocol: true})) {
          return value;
        }
        return helper.message('Некорректная ссылка');
      }),
  },
});

const validId = celebrate({
  params: {
    _id: Joi.string().required().min(24).max(24)
      .hex()
      .messages({
        'string.min': 'Минимум 24 символа',
        'string.max': 'Максимум 24 символов',
        'string.hex': 'Некорректная система счисления',
      }),
  },
});

const validLogin = celebrate({
  body: {
    email: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helper.message('Некорректный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Минимум 8 символов',
        'any.required': 'Обязательное поле',
      }),
  },
});

module.exports = {
  validCreateUser,
  validCreateCard,
  validPatchUser,
  validPatchAvatar,
  validId,
  validLogin,
};
