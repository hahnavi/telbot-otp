import 'source-map-support/register'
import 'dotenv/config'
import http from 'http'
import api from './api'
import bot from './bot'

function startApi () {
  const server = http.createServer(api)

  const normalizePort = (val: string) => {
    const port = parseInt(val, 10)
    if (Number.isNaN(port)) {
      return undefined
    }
    if (port >= 0) {
      return port
    }
    return undefined
  }

  const port = normalizePort(process.env.PORT || '3000')
  const host = process.env.HOST || '0.0.0.0'

  server.listen(port, host, () => {
    console.log(`API Listening on http://${host}:${port}`)
    console.log(`API Documentation at http://${host}:${port}/api-docs`)
  })
}

function startBot () {
  bot.launch()
    .then(() => {
      console.log('Bot is launched')
    }).catch(error => {
      console.log(error)
    })
}

if (process.env.API_ENABLE! === 'true') {
  startApi()
}

if (process.env.BOT_ENABLE! === 'true') {
  startBot()
}
