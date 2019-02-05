const moment = require('moment');
const Telegram = require('telegraf/telegram');

const { UserChat, Otp } = require('../models');

require('dotenv').config();

const telegram = new Telegram(process.env.BOT_TOKEN);

exports.generate = async (req, res) => {
  const userId = req.body.user_id;
  if (!userId) {
    res.status(400).json({ message: 'user_id is empty' });
    return;
  }

  const userChat = await UserChat.findOne({ where: { user_id: req.body.user_id } });
  if (!userChat) {
    res.status(404).json({ message: 'user_id not found' });
    return;
  }

  const otpVal = Math.floor(Math.random() * (999999 - 100000) + 100000);
  const exp = moment(new Date()).add(5, 'minutes');

  const otp = await Otp.findOne({ where: { user_id: userId } });
  if (otp) {
    if (moment(otp.updated_at).add(30, 'seconds').isAfter(new Date())) {
      res.send(false);
      return;
    }
    otp.otp = otpVal;
    otp.exp = exp;
    await otp.save();
  } else {
    await Otp.create({
      user_id: userId,
      otp: otpVal,
      exp,
    });
  }

  telegram.sendMessage(userChat.chat_id, `Kode OTP Anda: ${otpVal}`);
  res.send(true);
};

exports.verify = async (req, res) => {
  const userId = req.body.user_id;
  const otpVal = req.body.otp;
  if (!userId) {
    res.status(400).json({ message: 'user_id is empty' });
    return;
  }
  if (!otpVal) {
    res.status(400).json({ message: 'otp is empty' });
    return;
  }

  const otp = await Otp.findOne({ where: { user_id: userId, otp: otpVal } });
  if (otp) {
    await otp.destroy();
    if (moment(otp.exp).isBefore(new Date())) {
      res.send(false);
    } else {
      res.send(true);
    }
  } else {
    res.send(false);
  }
};
