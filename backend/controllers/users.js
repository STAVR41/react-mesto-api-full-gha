const User = require('../models/user');
const NotFoundError = require('../utils/errors/notFoundError');
const ValidationError = require('../utils/errors/validationError');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}
function getUserById(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return next(new NotFoundError('Пользователь с указанным id не найден'));
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new ValidationError('Переданы некорректные данные'));
      return next(err);
    });
}
function getCurrentUser(req, res, next) {
  const { _id } = req.user;
  User.findOne({ _id })
    .orFail(new NotFoundError('Пользователь с указанным id не найден'))
    .then((user) => res.send(user))
    .catch(next);
}
function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные'));
      return next(err);
    });
}
function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные'));
      return next(err);
    });
}

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
};
