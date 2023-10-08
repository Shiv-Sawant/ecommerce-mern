const Order = require('../modal/OrderModal')
const ErrorHandler = require('../utils/ErrorHandler')
const Product = require('../modal/ProductModal')
// const catchAsyncError = require('../middleware/catchAsyncError')

//create orders
exports.createOrder = async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    // console.log(req.body, "req.bodyreq.bodyreq.body")
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id,
        paidAt: Date.now(),
    })

    if (!order) {
        return next(new ErrorHandler('order not found', 400))
    }

    res.status(200).json({
        success: true,
        order
    })
}

//get single order
exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (!order) {
        return next(new ErrorHandler('order id not found', 400))
    }

    res.status(200).json({
        success: true,
        order
    })
}

//get all orders - only logged in
exports.myOrders = async (req, res, next) => {
    const order = await Order.find({ user: req.user._id })

    if (!order) {
        return next(new ErrorHandler('order id not found', 400))
    }

    res.status(200).json({
        success: true,
        order
    })

}

//get all orders - admin
exports.getAllOrders = async (req, res, next) => {
    const order = await Order.find({})

    if (!order) {
        return next(new ErrorHandler('order id not found', 400))
    }

    let totalAmount = 0

    order.forEach((order) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        order
    })

}

// update order status admin
exports.updateOrderStatus = async (req, res, next) => {
    let order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('order id not found', 400))
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('you have already delivered this order', 404))
    }

    if (order.orderStatus === 'Shipped') {
        order.orderItems.forEach(async (order) => {
            await updateOrder(order.product, order.quantity,next)
        })
    }

    order.orderStatus = req.body.status

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        order
    })
}

async function updateOrder(id, quantity,next) {
    const product = await Product.findById(id)

    if (!product) {
        return next(new ErrorHandler('product not found', 400))
    }

    product.Stock -= quantity

    await product.save({ validateBeforeSave: false })
}

//delete order
exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
        return next(new ErrorHandler('order id not found', 400))
    }

    res.status(200).json({
        success: true,
        message: "order deleted successfully"
    })
}

