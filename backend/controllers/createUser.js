const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ValidationError = require('../utils/errors/validationError');
const ConflictError = require('../utils/errors/conflictError');

function createUser(req, res, next) {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.status(201).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные при создании пользователя'));
          if (err.code === 11000) return next(new ConflictError('Пользователь с таким Email уже существует'));
          return next(err);
        });
    })
    .catch(next);
}
module.exports = {
  createUser,
};
