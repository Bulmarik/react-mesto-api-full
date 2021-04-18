const router = require('express').Router();
const { validId, validPatchUser, validPatchAvatar } = require('../validator/validator');
const {
  getUsers, getUser, getUserById, patchUser, patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:_id', validId, getUserById);
router.patch('/me', validPatchUser, patchUser);
router.patch('/me/avatar', validPatchAvatar, patchAvatar);

module.exports = router;
