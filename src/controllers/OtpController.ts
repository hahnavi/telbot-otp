import moment from 'moment'
import bcrypt from 'bcrypt'
import bot from '../bot'
import { Request, Response } from 'express'
import prisma from '../lib/prisma'

async function generate (req: Request, res: Response) {
  const userId = req.body.user_id
  if (!userId) {
    res.status(400).json({ message: 'user_id is empty' })
    return
  }

  const chat = await prisma.chat.findFirst({ where: { user: { userId } } })
  if (!chat) {
    res.status(404).json({ message: 'user_id not found' })
    return
  }

  const otpVal = Math.floor(Math.random() * (999999 - 100000) + 100000)

  const salt = bcrypt.genSaltSync(12)
  const hashOtp = bcrypt.hashSync(otpVal.toString(), salt)

  const exp = moment(new Date()).add(5, 'minutes').toDate()

  const otp = await prisma.otp.findFirst({ where: { user: { userId } } })
  if (otp) {
    if (moment(otp.exp).subtract(270, 'seconds').isAfter(new Date())) {
      res.status(400).json({ success: false })
      return
    }
    await prisma.otp.update({ where: { id: otp.id }, data: { otp: hashOtp, exp } })
  } else {
    await prisma.otp.create({
      data: {
        userId: chat.userId,
        otp: hashOtp,
        exp
      }
    })
  }

  bot.telegram.sendMessage(Number(chat.chatId), `Your One Time Password is ${otpVal}`)
    .then(() => {
      res.send({ success: true })
    })
    .catch(() => {
      res.status(400).json({ success: false })
    })
}

async function verify (req: Request, res: Response) {
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

  const otp = await prisma.otp.findFirst({ where: { user: { userId } } })
  if (otp) {
    if (bcrypt.compareSync(req.body.otp, otp.otp)) {
      await prisma.otp.delete({ where: { id: otp.id } })
      if (moment(otp.exp).isBefore(new Date())) {
        res.status(400).json({ success: false })
      } else {
        res.send({ success: true })
      }
    } else {
      res.status(400).json({ success: false })
    }
  } else {
    res.status(400).json({ success: false })
  }
}

export default { generate, verify }
