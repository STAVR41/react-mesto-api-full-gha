const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { regular } = require('../utils/regular');
const UnauthorizedError = require('../utils/errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    maxlength: 30,
    minlength: 2,
    type: String,
    default: 'Жак-Ив Кусто',
  },
  about: {
    maxlength: 30,
    minlength: 2,
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validator: {
      validator: (v) => regular.test(v),
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный Email',
    },
  },
  password: {
    require: true,
    type: String,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByEmail = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((mathed) => {
          if (!mathed) {
            return Promise.reject(new UnauthorizedError('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
