const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_KEY } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

function authentication(req, res, next) {
  const { password, email } = req.body;
  return User.findUserByEmail(email, password)
    .then((login) => {
      const token = jwt.sign({ _id: login._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_KEY, { expiresIn: '7d' });
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
