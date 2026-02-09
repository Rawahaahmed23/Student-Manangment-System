const express = require('express')
const Route = express.Router()
const auhtController = require('../controller/auth')


Route.route('/Singup').post(auhtController.Singup)
Route.route('/Login').post(auhtController.Login)
Route.route('/Logout').post(auhtController.Logout)





module.exports= Route