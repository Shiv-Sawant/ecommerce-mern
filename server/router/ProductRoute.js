const express = require('express')
const { getAllProducts, createProducts, updateProducts, deleteProduct, getProductDetail, createProductReview, getSinglProductReivew, deleteReview, getAllAdminProducts } = require('../controller/ProductController')
const { isAuthenticate, autohrizedRole } = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/admin/products').get(getAllAdminProducts)
router.route('/admin/product/new').post(isAuthenticate, autohrizedRole("admin"), createProducts)
router.route('/admin/product/:id').put(isAuthenticate, autohrizedRole("admin"), updateProducts).delete(isAuthenticate, autohrizedRole("admin"), deleteProduct)
router.route('/product/:id').get(getProductDetail)
router.route('/review').post(isAuthenticate, createProductReview)
router.route('/reviews').get(getSinglProductReivew).delete(deleteReview)



module.exports = router