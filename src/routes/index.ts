import { Router } from 'express'
import otp from './otp'
import user from './user'

const router = Router()

router.use('/otp', otp)
router.use('/user', user)

export default router
