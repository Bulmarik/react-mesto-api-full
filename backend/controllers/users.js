const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequest, Unauthorized, NotFound, Conflict,
} = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const id = req.params._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Данный пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Данный пользователь уже существует');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then(() => res.status(201).send({
          name, about, avatar, email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequest('Переданы некорректные данные');
          }
        });
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Данный пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Данный пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные email или пароль');
          }
          const token = jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'abracadabra',
            { expiresIn: '7d' });
          return res.send(
            {
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
              _id: user._id,
              token,
            },
          );
        });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Данный пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchAvatar,
  login,
  getUser,
};
