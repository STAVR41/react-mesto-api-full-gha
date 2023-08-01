const router = require('express').Router();
const {
  validateId,
  validateUpdateProfileUser,
  validateUpdateAvatar,
} = require('../middlewares/validations');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateId, getUserById);
router.patch('/me', validateUpdateProfileUser, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
