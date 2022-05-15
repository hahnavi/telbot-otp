import express from 'express'
import swaggerUi from 'swagger-ui-express'
import routes from './routes'
import auth from './middleware/auth'

const api = express()

api.use(express.json())

if (process.env.ENABLE_API_AUTH === 'true') {
  api.use(auth)
}

api.use('/', routes)

const swaggerDocument = require('../swagger.json')
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default api
