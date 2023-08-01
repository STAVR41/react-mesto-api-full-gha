const mongoose = require('mongoose');
const { regular } = require('../utils/regular');

const cardSchema = new mongoose.Schema({
  name: {
    maxlength: 30,
    minlength: 2,
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (v) => regular.test(v),
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });
module.exports = mongoose.model('card', cardSchema);
