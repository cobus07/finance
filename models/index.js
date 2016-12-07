var Schema = require('mongoose').Schema;

module.exports.Finance = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  income: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  create: {
    type: Date,
    default: Date.now(),
  },
  update: {
    type: Date,
    default: Date.now,
  },
});

module.exports.User = new Schema({
  name: String,
  username: String,
  password: String,
  create: Date,
  update: {
    type: Date,
    default: Date.now,
  },
});
