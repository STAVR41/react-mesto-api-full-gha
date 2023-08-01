const Card = require('../models/card');
const ValidationError = require('../utils/errors/validationError');
const ForbiddenError = require('../utils/errors/forbiddenError');
const NotFoundError = require('../utils/errors/notFoundError');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}
function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные при создании карточки'));
      return next(err);
    });
}
function deleteCardById(req, res, next) {
  const { _id } = req.user;
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Карточки с указанным id не существует'))
    .then((card) => {
      if (_id !== JSON.stringify(card.owner).slice(1, -1)) return next(new ForbiddenError('Вы можете удалять только свои карточки'));
      return Card.findByIdAndRemove(req.params.id)
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch(next);
}
function handleLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return next(new NotFoundError('Карточка не найдена'));
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные'));
      return next(err);
    });
}
function removeLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return next(new NotFoundError('Карточка не найдена'));
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные'));
      return next(err);
    });
}

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  handleLike,
  removeLike,
};
