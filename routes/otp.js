const express = require('express')

const router = express.Router()

const OtpController = require('../controllers/OtpController')

/* POST otp generate. */
router.post('/generate', OtpController.generate)

/* POST otp verify. */
router.post('/verify', OtpController.verify)

module.exports = router
