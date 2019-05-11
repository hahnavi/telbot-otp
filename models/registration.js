const mongoose = require('mongoose')

const registrationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: String,
  token: String,
  exp: Date
})

module.exports = mongoose.model('Registration', registrationSchema, 'Registrations')
