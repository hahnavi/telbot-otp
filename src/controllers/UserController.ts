import moment from 'moment'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import prisma from '../lib/prisma'

async function reg (req: Request, res: Response) {
  const userId = req.body.user_id
  if (!userId) {
    res.status(400).json({ message: 'user_id is empty' })
    return
  }

  const regCode = Math.floor(Math.random() * (999999 - 100000) + 100000).toString()
  const exp = moment(new Date()).add(1, 'hours').toDate()

  const salt = bcrypt.genSaltSync(12)
  const hashRegCode = bcrypt.hashSync(regCode.toString(), salt)

  const reg = await prisma.registration.findFirst({ where: { userId } })
  if (reg) {
    await prisma.registration.update({
      where: { id: reg.id },
      data: { regCode: hashRegCode, exp }
    })
    reg.regCode = regCode
    reg.exp = exp
    res.send(reg)
  } else {
    const regNew = await prisma.registration.create({
      data: {
        userId,
        regCode: hashRegCode,
        exp
      }
    })
    regNew.regCode = regCode
    res.send(regNew)
  }
}

async function status (req: Request, res: Response) {
  const chat = await prisma.chat.findFirst({ where: { user: { userId: req.body.user_id } } })
  if (chat) {
    res.json({ status: 'registered' })
  } else {
    res.json({ status: 'unregistered' })
  }
}

export default { reg, status }
