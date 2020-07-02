const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  amount: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: false
  }
});

const Model = mongoose.model('Expense', schema);

module.exports = Model;