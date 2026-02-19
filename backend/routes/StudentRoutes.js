const express = require('express')
const Route = express.Router()
const student = require('../controller/studentData')


Route.route('/addstudent').post(student.AddStudent)






module.exports = Route