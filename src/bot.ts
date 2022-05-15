import { Telegraf } from 'telegraf'
import bcrypt from 'bcrypt'
import prisma from './lib/prisma'

const bot = new Telegraf(process.env.BOT_TOKEN!)

bot.start(async (ctx) => {
  const chat = await prisma.chat.findFirst({ where: { chatId: ctx.chat.id } })
  if (chat) {
    ctx.reply('Welcome!')
  } else {
    ctx.reply('Welcome!\nPlease register using the command:\n/reg <user_id> <reg_code>\nexample:\n/reg myuser123 987654')
  }
})

bot.command('reg', async (ctx) => {
  const chat = await prisma.chat.findFirst({ where: { chatId: ctx.chat.id } })
  if (chat) {
    ctx.reply('You are already registered.')
    return
  }
  const splitted = ctx.message.text.split(/\s+/)
  if (splitted.length < 3) {
    ctx.reply('You must enter user id and registration code to register.\nUse commands:\n/reg <user_id> <reg_code>\nexample:\n/reg myuser123 987654')
  } else {
    const userId = splitted[1]
    const regCode = splitted[2]
    const reg = await prisma.registration.findFirst({ where: { userId } })
    if (reg) {
      if (bcrypt.compareSync(regCode, reg.regCode)) {
        const user = await prisma.user.upsert(
          { where: { userId }, update: {}, create: { userId } }
        )
        await prisma.chat.upsert(
          { where: { userId: user.id }, update: {}, create: { userId: user.id, chatId: ctx.chat.id } }
        )
        await prisma.registration.delete({ where: { id: reg.id } })
        ctx.reply('You have successfully registered.')
      } else {
        ctx.reply('Failed to register!\nWrong user id or registration code.')
      }
    } else {
      ctx.reply('Failed to register!\nWrong user id or registration code.')
    }
  }
})

bot.command('stop', async (ctx) => {
  const chat = await prisma.chat.findFirst({ where: { chatId: ctx.chat.id } })
  if (chat) {
    await prisma.user.delete({ where: { id: chat.userId } })
  }
  ctx.reply('You are logged out.')
})

export default bot
