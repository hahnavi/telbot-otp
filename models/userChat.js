const mongoose = require('mongoose')

const userChatSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: String,
  chat_id: String
})

module.exports = mongoose.model('UserChat', userChatSchema, 'UserChats')
