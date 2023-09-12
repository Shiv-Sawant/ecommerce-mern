const express = require('express')
const { isAuthenticate, autohrizedRole } = require('../middleware/auth')
const { createOrder, getSingleOrder, getAllOrders, myOrders, updateOrderStatus, deleteOrder } = require('../controller/OrderController')
const router = express.Router()

router.route('/order/new').post(isAuthenticate, createOrder)
router.route('/get/order/:id').get(isAuthenticate,getSingleOrder)
router.route('/get/orders').get(isAuthenticate,myOrders)
router.route('/admin/all/orders').get(isAuthenticate,autohrizedRole('admin'),getAllOrders)
router.route('/admin/order/:id').put(isAuthenticate,autohrizedRole('admin'),updateOrderStatus).delete(isAuthenticate,autohrizedRole('admin'),deleteOrder)

module.exports = router