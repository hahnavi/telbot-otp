const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: String,
  otp: String,
  exp: Date
})

module.exports = mongoose.model('Otp', otpSchema, 'Otps')
