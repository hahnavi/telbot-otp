const moment = require('moment')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Registration, UserChat } = require('../models')

exports.reg = async (req, res) => {
  const userId = req.body.user_id
  if (!userId) {
    res.status(400).json({ message: 'user_id is empty' })
    return
  }

  const regCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
  const exp = moment(new Date()).add(1, 'hours')

  const salt = bcrypt.genSaltSync(12)
  const hashRegCode = bcrypt.hashSync(regCode.toString(), salt)

  const reg = await Registration.findOne({ user_id: userId })
  if (reg) {
    reg.reg_code = hashRegCode
    reg.exp = exp
    await reg.save()
    reg.reg_code = regCode
    res.send(reg)
  } else {
    const regNew = new Registration({
      _id: new mongoose.Types.ObjectId(),
      user_id: userId,
      reg_code: hashRegCode,
      exp
    })
    await regNew.save()
    regNew.reg_code = regCode
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
