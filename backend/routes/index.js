const router = require('express').Router();
const { NotFound } = require('../errors');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', () => {
  throw new NotFound('Страница не найдена');
});

module.exports = router;
