const moment = require('moment')
const mongoose = require('mongoose')
const bot = require('../bot')

const { UserChat, Otp } = require('../models')

require('dotenv').config()

exports.generate = async (req, res) => {
  const userId = req.body.user_id
  if (!userId) {
    res.status(400).json({ message: 'user_id is empty' })
    return
  }

  const userChat = await UserChat.findOne({ user_id: req.body.user_id })
  if (!userChat) {
    res.status(404).json({ message: 'user_id not found' })
    return
  }

  const otpVal = Math.floor(Math.random() * (999999 - 100000) + 100000)
  const exp = moment(new Date()).add(5, 'minutes')

  const otp = await Otp.findOne({ user_id: userId })
  if (otp) {
    if (moment(otp.exp).subtract(270, 'seconds').isAfter(new Date())) {
      res.send({ success: false })
      return
    }
    otp.otp = otpVal
    otp.exp = exp
    await otp.save()
  } else {
    const otpNew = new Otp({
      _id: new mongoose.Types.ObjectId(),
      user_id: userId,
      otp: otpVal,
      exp
    })
    await otpNew.save()
  }

  bot.telegram.sendMessage(userChat.chat_id, `Your OTP Code: ${otpVal}`)
    .then(() => {
      res.send({ success: true })
    })
    .catch(() => {
      res.send({ success: false })
    })
}

exports.verify = async (req, res) => {
  const userId = req.body.user_id
  const otpVal = req.body.otp
  if (!userId) {
    res.status(400).json({ message: 'user_id is empty' })
    return
  }
  if (!otpVal) {
    res.status(400).json({ message: 'otp is empty' })
    return
  }

  const otp = await Otp.findOne({ user_id: userId, otp: otpVal })
  if (otp) {
    await otp.delete()
    if (moment(otp.exp).isBefore(new Date())) {
      res.send({ success: false })
    } else {
      res.send({ success: true })
    }
  } else {
    res.send({ success: false })
  }
}
