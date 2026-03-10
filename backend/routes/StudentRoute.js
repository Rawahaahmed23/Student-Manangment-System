const express = require('express')

const route = express.Router()
const { upload } = require('../config/cloudnary');
const Student = require('../controller/studentData')
const validator = require('../middleware/Validator')
const studentValidationSchema = require('../validator/studentvalidation')

route.post(
  '/add_Student',
  upload.single('profileImage'),
  validator(studentValidationSchema), 
  Student.AddStudent
)

route.get('/getStudent', Student.getStudent)

route.put(
  '/edit/:_id',
  upload.single('profileImage'),
  validator(studentValidationSchema),
  Student.EditStudent
)

route.delete('/delete/:_id', Student.deleteStudent)

module.exports = route