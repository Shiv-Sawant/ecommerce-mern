const express = require('express')
const router = express.Router()

const { userRegister, userLogin, userlogout, userForgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controller/UserController')
const { isAuthenticate, autohrizedRole } = require('../middleware/auth')

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/logout').get(userlogout)
router.route('/password/reset').post(userForgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticate, getUserDetails)
router.route('/password/update').put(isAuthenticate, updatePassword)
router.route("/me/update").put(isAuthenticate, updateProfile)
router.route('/admin/users').get(isAuthenticate, autohrizedRole('admin'), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticate, autohrizedRole('admin'), getSingleUser).put(isAuthenticate, autohrizedRole('admin'), updateUserRole).delete(isAuthenticate, autohrizedRole('admin'), deleteUser)

module.exports = router
