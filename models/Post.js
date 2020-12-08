const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  symbol: {
    type: String,
    required: true
  },
  name: String,
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Posts', PostSchema);