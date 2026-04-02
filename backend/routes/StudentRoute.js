const express = require('express')

const route = express.Router()

const Student = require('../controller/studentData')
const validator = require('../middleware/Validator')
const studentValidationSchema = require('../validator/studentvalidation')

route.post(
  '/add_Student',
 validator(studentValidationSchema), 
  Student.AddStudent
)

route.get('/getStudent', Student.getStudent)

route.put(
  '/edit/:_id',

  validator(studentValidationSchema),
  Student.EditStudent
)
route.get("/download",Student.generateStudentsPDF );
route.delete('/delete/:_id', Student.deleteStudent)

module.exports = route