import express from 'express'
import OtpController from '../controllers/OtpController'

const router = express.Router()

/* POST otp generate. */
router.post('/generate', OtpController.generate)

/* POST otp verify. */
router.post('/verify', OtpController.verify)

export default router
