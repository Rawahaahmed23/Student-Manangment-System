const express = require('express')
const Route = express.Router()
const auhtController = require('../controller/auth')
const authmiddleware = require('../middleware/authmiddleware')
const validator = require('../middleware/Validator')
const {signupSchema,loginSchema} = require('../validator/validation')


Route.route('/signup').post(validator(signupSchema), auhtController.Singup);
Route.route('/auth').get(authmiddleware,auhtController.user)
Route.route('/Login').post(validator(loginSchema),auhtController.Login)
Route.route('/Logout').post(auhtController.Logout)
Route.route('/sendOtp').post(auhtController.sendOtp)
Route.route('/resetPassword').post(auhtController.ResetPassword)
Route.route('/verify-otp').post(auhtController.verifyOtp)





module.exports= Route