const { Telegraf } = require('telegraf')
const mongoose = require('mongoose')
const { Registration, UserChat } = require('./models')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async (ctx) => {
  const userChat = await UserChat.findOne({ chat_id: ctx.chat.id })
  if (userChat) {
    ctx.reply('Welcome!')
  } else {
    ctx.reply('Welcome!\nPlease register using the command:\n/reg <token>')
  }
})

bot.command('reg', async (ctx) => {
  const userChat = await UserChat.findOne({ chat_id: ctx.chat.id })
  if (userChat) {
    ctx.reply('You are already registered.')
    return
  }
  const splitted = ctx.message.text.split(/\s+/)
  if (splitted.length < 2) {
    ctx.reply('You must enter a registration token to register.\nUse commands:\n/reg <token>')
  } else {
    const token = splitted[1]
    const reg = await Registration.findOne({ token })
    if (reg) {
      const result = await UserChat.findOne({ user_id: reg.user_id })
      if (result) {
        userChat.chat_id = ctx.chat.id
        await userChat.save()
      } else {
        const userChatNew = new UserChat({
          _id: new mongoose.Types.ObjectId(),
          user_id: reg.user_id,
          chat_id: ctx.chat.id
        })
        await userChatNew.save()
      }
      await reg.delete()
      ctx.reply('You have successfully registered.')
    } else {
      ctx.reply('Token not found.')
    }
  }
})

module.exports = bot
