const express = require('express');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { validLogin, validCreateUser } = require('./validator/validator');
const {
  createUser, login,
} = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.post('/signin', validLogin, login);
app.post('/signup', validCreateUser, createUser);
app.use(router);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
