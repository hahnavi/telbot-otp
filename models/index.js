const mongoose = require('mongoose')

const Otp = require('./otp')
const Registration = require('./registration')
const UserChat = require('./userChat')

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
}

module.exports = {
  connectDb,
  Otp,
  Registration,
  UserChat
}
