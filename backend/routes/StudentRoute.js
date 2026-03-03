const express = require('express')

const route = express.Router()
const { upload } = require('../config/cloudnary');
const Student = require('../controller/studentData')




route.post('/add_Student', upload.single('ProfilePicture'), Student.AddStudent)
route.put('/edit/:_id', upload.single('profileImage'), Student.EditStudent);
route.route('/delete/:_id').delete(Student.deleteStudent)




module.exports =route
