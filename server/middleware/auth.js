const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/ErrorHandler')
const jwt = require('jsonwebtoken')
const User = require('../modal/UserModal')

exports.isAuthenticate = catchAsyncError(async (req, res, next) => {


    try {
        const token = req.cookies.getCookie

        if (!token) {
            return next(new ErrorHandler('Please login to access this resouce', 401))
        }

        const decodeData = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decodeData, "decodeData")
        console.log(token, "from auth token")

        req.user = await User.findById(decodeData.id)

         console.log(req.user)
        next()

    } catch (error) {
        res.status(401).send('Unauthorized: No Token Provided')
        // console.log(err, "authntiate err")
    }

})

exports.autohrizedRole = (...roles) => {
    return (req, res, next) => {
        // console.log(req.user, "req.userreq.user")
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allow to access resources`, 403
            ))
        }
        next()
    }
}