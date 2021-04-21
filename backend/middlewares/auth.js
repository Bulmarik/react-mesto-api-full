const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized('Ошибка авторизации');
  }
  const token = authorization.replace(/^Bearer /, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'bolshoy-secret');
  } catch (err) {
    throw new Unauthorized('2Ошибка авторизации');
  }

  req.user = payload;
  next();
};

module.exports = auth;
