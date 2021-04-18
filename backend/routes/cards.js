const router = require('express').Router();
const { validCreateCard, validId } = require('../validator/validator');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validCreateCard, createCard);
router.delete('/:_id', validId, deleteCard);
router.put('/:_id/likes', validId, likeCard);
router.delete('/:_id/likes', validId, dislikeCard);

module.exports = router;
