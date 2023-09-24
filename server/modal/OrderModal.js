const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        Address: { type: String, required: true },
        City: { type: String, required: true },
        State: { type: String, required: true },
        Country: { type: String, required: true },
        Pincode: { type: String, required: true },
        PhoneNumber: { type: String, required: true },
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
        }
    ],
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true }
    },
    paidAt: { type: Date, required: true },
    itemsPrice: { type: Number, default: 0, required: true },
    taxPrice: { type: Number, default: 0, required: true },
    shippingPrice: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    orderStatus: { type: String, default: "Processing", required: true },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', orderSchema)