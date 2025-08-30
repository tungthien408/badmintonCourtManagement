// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  __v: { type: Number, select: false }, 
});

module.exports = mongoose.model('User', userSchema);