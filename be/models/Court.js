const mongoose = require('mongoose');

const Court = mongoose.model('Court', {
  name: String,
  isAvailable: Boolean
});

module.exports = Court;