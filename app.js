const path = require('path')

require('dotenv').config({
  path: path.join(__dirname, '/.env')
})

const express = require('express')
const http = require('http')
const bot = require('./bot')
const { connectDb } = require('./models')

const app = express()

app.use(express.json())

app.use('/user', require('./routes/user'))
app.use('/otp', require('./routes/otp'))

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const normalizePort = (val) => {
  const port = parseInt(val, 10)
  if (Number.isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  if (error.code === 'EACCES') {
    console.error(`${bind} requires elevated privileges`)
    process.exit(1)
  } else if (error.code === 'EADDRINUSE') {
    console.error(`${bind} is already in use`)
    process.exit(1)
  } else {
    throw error
  }
}

const server = http.createServer(app)

const onListening = () => {
  const addr = server.address()
  console.log(`Listening on http://${addr.address}:${addr.port}`)
  console.log(`API Documentation at http://${addr.address}:${addr.port}/api-docs`)
  bot.launch()
  console.log('Bot is launched')
}

server.on('error', onError)
server.on('listening', onListening)

connectDb()
  .then(async () => {
    console.log('Connected to database')
    server.listen(port, process.env.HOST || '0.0.0.0')
  })
  .catch((error) => {
    console.log(`Database error: ${error.message}`)
  })
