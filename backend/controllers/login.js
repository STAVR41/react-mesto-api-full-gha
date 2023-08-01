const jwt = require('jsonwebtoken');
const User = require('../models/user');

function authentication(req, res, next) {
  const { password, email } = req.body;
  return User.findUserByEmail(email, password)
    .then((login) => {
      const token = jwt.sign({ _id: login._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ message: 'Всё верно', token });
    })
    .catch(next);
}

module.exports = {
  authentication,
};
