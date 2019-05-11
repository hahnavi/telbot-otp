const express = require('express')

const router = express.Router()

const UserController = require('../controllers/UserController')

/* POST user registration. */
router.post('/register', UserController.reg)

/* POST user status. */
router.post('/status', UserController.status)

module.exports = router
