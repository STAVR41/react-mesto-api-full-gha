require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { authentication } = require('./controllers/login');
const { createUser } = require('./controllers/createUser');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/handleError');
const { validateLoginUser, validateCreateUser } = require('./middlewares/validations');
const NotFoundError = require('./utils/errors/notFoundError');

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL);

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'https://stavr.nomoreparties.co', 'http://stavr.nomoreparties.co'], credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestLogger);
const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(limiter);
app.post('/signin', validateLoginUser, authentication);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
