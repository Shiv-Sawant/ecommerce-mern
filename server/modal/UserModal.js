const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "name should have more then 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter valid email"]
        // validate: [ "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater then 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'User'
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

//Genrating reset password token
userSchema.methods.getResetPasswordToken = async function () {
    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // hashing and adding reset password token to schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken;
};

module.exports = mongoose.model("User", userSchema)