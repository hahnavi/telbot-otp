const moment = require('moment')
const mongoose = require('mongoose')
const { promisify } = require('util')
const { randomBytes } = require('crypto')

const { Registration, UserChat } = require('../models')

const tokenGenerator = async () => {
  const randomBytesAsync = promisify(randomBytes)
  const buffer = await randomBytesAsync(4)
  return buffer.toString('hex')
}

exports.reg = async (req, res) => {
  const userId = req.body.user_id
  if (!userId) {
    res.status(400).json({ message: 'user_id is empty' })
    return
  }

  const token = await tokenGenerator()
  const exp = moment(new Date()).add(1, 'hours')

  const reg = await Registration.findOne({ user_id: userId })
  if (reg) {
    reg.token = token
    reg.exp = exp
    await reg.save()
    res.send(reg)
  } else {
    const regNew = new Registration({
      _id: new mongoose.Types.ObjectId(),
      user_id: userId,
      token,
      exp
    })
    await regNew.save()
    res.send(regNew)
  }
}

exports.status = async (req, res) => {
  const userChat = await UserChat.findOne({ user_id: req.body.user_id })
  if (userChat) {
    res.json({ status: 'registered' })
  } else {
    res.json({ status: 'unregistered' })
  }
}
