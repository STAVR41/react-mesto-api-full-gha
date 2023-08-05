const jwt = require('jsonwebtoken');
const User = require('../models/user');

function authentication(req, res, next) {
  const { password, email } = req.body;
  return User.findUserByEmail(email, password)
    .then((login) => {
      const token = jwt.sign({ _id: login._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: true,
      });
      return res.send({ login });
    })
    .catch(next);
}

module.exports = {
  authentication,
};
