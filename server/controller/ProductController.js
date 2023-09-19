const Product = require("../modal/ProductModal")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require("../utils/apifeatures")


//create products for admin only
exports.createProducts = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

//get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    // return next(new ErrorHandler('this is error', 400))
    const resultPerPage = 15
    const productCount = await Product.countDocuments()

    let apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    let products = await apiFeature.query

    res.status(200).json({
        success: true,
        productCount,
        resultPerPage,
        // filterProductCount,
        products
    })
})

//get product details
exports.getProductDetail = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    console.log('into product detail route')
    if (!product) {
        return next(new ErrorHandler('Product Id Incorrect', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

//update products
exports.updateProducts = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product Id Incorrect', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product Id Incorrect', 404))
    }

    await product.deleteOne();


    res.status(200).json({
        success: true,
        message: "product deleted Successfully"
    })
})

//review route
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment)
        })
    } else {
        product.reviews.push(review)
        product.numOfReview = product.reviews.length
    }

    let avg = 0

    product.reviews.forEach((rev) => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

//get single product review
exports.getSinglProductReivew = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler('product not found', 400))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler('product not found', 400))
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    )

    let avg = 0

    reviews.forEach((rev) => {
        avg += rev.rating
    })

    const ratings = avg / reviews.length

    const numOfReview = reviews.length

    await product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReview
    }, {
        new: true,
        validator: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "review delete successfully"
    })
})