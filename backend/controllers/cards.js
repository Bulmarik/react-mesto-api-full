const Card = require('../models/card');
const { Forbidden, NotFound } = require('../errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const id = req.params._id;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFound('Данная карточка не найдена');
      }
      if (String(card.owner) !== req.user._id) {
        throw new Forbidden('Нельзя удалить чужую карточку');
      }
      return Card.findByIdAndRemove(card._id)
        .then(() => res.status(200).send({ message: 'Удаление прошло удачно' }))
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const id = req.params._id;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new NotFound('Данная карточка не найдена');
      }
      return res.status(200).send(like);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const id = req.params._id;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new NotFound('Данная карточка не найдена');
      }
      return res.status(200).send(like);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
