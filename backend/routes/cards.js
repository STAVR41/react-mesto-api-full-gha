const router = require('express').Router();
const { validateId, validateCreateCard } = require('../middlewares/validations');
const {
  createCard,
  getCards,
  deleteCardById,
  handleLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', validateId, deleteCardById);
router.post('/', validateCreateCard, createCard);
router.put('/:id/likes', validateId, handleLike);
router.delete('/:id/likes', validateId, removeLike);

module.exports = router;
