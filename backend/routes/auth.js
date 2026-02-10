const express = require('express')
const Route = express.Router()
const auhtController = require('../controller/auth')


Route.route('/Singup').post(auhtController.Singup)
Route.route('/Login').post(auhtController.Login)
Route.route('/Logout').post(auhtController.Logout)
Route.route('/sendOtp').post(auhtController.sendOtp)
Route.route('/resetPassword').post(auhtController.ResetPassword)





module.exports= Route