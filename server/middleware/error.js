const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error'
 
    // wrong mongodb id error
    if(err.name === 'CastError') {
        const message = `Resource Not Found, Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    //Mogoose duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    //wrong jwt token
    if(err.name === 'JsonWebTokenError') {
        const message = `Json web token is invalid, try again`
        err = new ErrorHandler(message, 400)
    }

     //JWT expire error
     if(err.name === 'TokenExpireError') {
        const message = `Json web token is Expire, try again`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}