import express from 'express'
import UserController from '../controllers/UserController'

const router = express.Router()

/* POST user registration. */
router.post('/register', UserController.reg)

/* POST user status. */
router.post('/status', UserController.status)

export default router
