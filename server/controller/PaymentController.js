const catchAsyncError = require('../middleware/catchAsyncError')

const stripe = require('stripe')('sk_test_51NsTSESA97L9ozy2ZdtRvp8Jeo6aOYtuwgh9QdaGHeRSy61qRja4axby8P01pMUSUfsultiOhrRye7QVDOM5Cw2W00oRQKqBsP')

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        statement_descriptor_suffix: 'Paying Using Stripe',
        metadata: {
            company: 'ECOMMERCE'
        }
    })

    res.status(200).json({
        success: true,
        clientSecret: myPayment.client_secret
    })
})

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    // console.log('into sendstripekey route')
    res.status(200).json({ stripapikey: process.env.STRIPE_API_KEY })
})