const express = require('express')
const { processPayment, sendStripeApiKey } = require('../controller/PaymentController')
const { isAuthenticate, autohrizedRole } = require('../middleware/auth')

const router = express.Router()

router.route('/proceed/payment').post(isAuthenticate, processPayment)
router.route('/sendApiKey').get(isAuthenticate, sendStripeApiKey)

module.exports = router