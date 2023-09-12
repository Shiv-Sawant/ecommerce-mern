const User = require('../modal/UserModal')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/ErrorHandler')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const cloudinary = require('cloudinary')

//register route
exports.userRegister = catchAsyncError(async (req, res, next) => {

    // console.log(req.body)
    console.log('into register route')

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150
    })

    console.log('into register route')

    const { name, email, password, avatar } = req.body

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.url
        }
    })

    const token = user.getJwtToken()

    res.status(201).json({
        success: true,
        token
    })
})

// login route
exports.userLogin = async (req, res, next) => {
    console.log('into login route')
    // const data = await req.body
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    console.log(user, "user")

    if (!user || user === null) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isMatchPassword = await user.comparePassword(password)

    if (!isMatchPassword) {
        return new ErrorHandler("invalid crediential", 400)
    }

    sendToken(user, 200, res);
    console.log('exit sendtoken function')
    console.log(await req, "getting cookie")
    console.log(await req.cookies.getCookie, "getting cookie")
}

//logout route
exports.userlogout = catchAsyncError(async (req, res, next) => {

    res.cookie("getCookie", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logout Successfull'
    })
})

// forgot password route
exports.userForgotPassword = catchAsyncError(async (req, res, next) => {
    console.log("in forgot password route")

    const user = await User.findOne({ email: req.body.email })


    if (!user) {
        return next(new ErrorHandler("User Not Found", 404))
    }

    // get reset password token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email, then please ignore it`

    try {
        console.log("into the try catch")
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce password recovery',
            message
        })

        console.log("compleote send mail function")

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Does not match with confirm password", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})

// Get User details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    console.log(req.user, "req.user.idreq.user.id")

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400))
    }

    console.log(req.body.newPassword, req.body.confirmPassword)
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, 200, res)
})

// update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.body.avatar !== "") {
        console.log("into the req.body.avatar")
        const user = await User.findById(req.user._id)

        const imageId = user.avatar.public_id

        console.log('before destroy mycloud')

        console.log(imageId)

        await cloudinary.v2.uploader.destroy(imageId)

        console.log('after destroy mycloud')

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            // crop: "scale"
        })

        console.log('after mycloud')

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.url
        }
    }

    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

//get all users(admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

//get single user(admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`user does not exist of id ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//update user role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

//Delete User (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`id does not found ${req.params.id}`, 400))
    }

    // await user.remove()

    res.status(200).json({
        success: true,
        message: "user delete successfully"
    })
})

