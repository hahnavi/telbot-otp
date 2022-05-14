import express from 'express'
import swaggerUi from 'swagger-ui-express'
import userRoutes from './routes/user'
import otpRoutes from './routes/otp'

const api = express()

api.use(express.json())

api.use('/user', userRoutes)
api.use('/otp', otpRoutes)

const swaggerDocument = require('../swagger.json')
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default api
