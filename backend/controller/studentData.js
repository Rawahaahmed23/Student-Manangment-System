const Student = require('../schema/StudentSchema')
const cloudinary = require('cloudinary').v2;
const puppeteer = require("puppeteer");
const { uploadToCloudinary } = require("../config/cloudnary")


const moment = require('moment'); 

const AddStudent = async (req, res) => {
  try {
    const {
      GrNumber, StudentName, FatherName,
      Class, Gender, DateOfBirth,
      DateOfAdmission, MonthlyFee,
    } = req.body;

    // Duplicate check
    const existingStudent = await Student.findOne({ GrNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // ✅ let use karo — const nahi (reassign hoga agar file aaye)
    let profileImage = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      profileImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    const student = new Student({
      GrNumber,
      StudentName,
      FatherName,
      Class,
      paidMonths: [],  
      Gender,
      DateOfBirth: moment(DateOfBirth, 'YYYY-MM-DD').toDate(),
      DateOfAdmission: moment(DateOfAdmission, 'YYYY-MM-DD').toDate(),
      MonthlyFee,
      profileImage
    });

    await student.save();
    res.status(201).json({ message: "Student Added Successfully", student });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    const student = await Student.findById(_id);
    
    if (!student) {
      return res.status(400).json({ message: 'Student Not Found' });
    }
if (student.profileImage?.public_id) {
  await cloudinary.uploader.destroy(student.profileImage.public_id);
}

    await Student.findByIdAndDelete(_id);
    return res.status(200).json({ message: 'Student Deleted Successfully' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const EditStudent = async (req, res) => {
  try {
    const { _id } = req.params;

    const student = await Student.findById(_id);
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    const {
      GrNumber, StudentName, FatherName, Class, Gender,
      DateOfBirth, DateOfAdmission, MonthlyFee, FeeStatus,
      LastFeeUpdate, profileImage 
    } = req.body;

    if (GrNumber && GrNumber !== student.GrNumber) {
      const existing = await Student.findOne({ GrNumber });
      if (existing) {
        return res.status(400).json({ message: "GrNumber already exists" });
      }
    }

    // ✅ Agar naya image aaya toh purana Cloudinary se delete karo
    if (profileImage?.public_id && profileImage.public_id !== student.profileImage?.public_id) {
      if (student.profileImage?.public_id) {
        await cloudinary.uploader.destroy(student.profileImage.public_id);
      }
    }

    const updatedData = {
      ...(GrNumber && { GrNumber }),
      ...(StudentName && { StudentName }),
      ...(FatherName && { FatherName }),
      ...(Class && { Class }),
      ...(Gender && { Gender }),
      ...(DateOfBirth && { DateOfBirth }),
      ...(DateOfAdmission && { DateOfAdmission }),
      ...(MonthlyFee !== undefined && { MonthlyFee }),
      ...(FeeStatus && { FeeStatus }),
      ...(LastFeeUpdate && { LastFeeUpdate }),
      profileImage: profileImage || student.profileImage, // ✅
    };

    const updatedStudent = await Student.findByIdAndUpdate(
      _id,
      { $set: updatedData },
      { new: true }
    );

    return res.status(200).json({ message: "Student Updated Successfully", student: updatedStudent });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const students = await Student.find();  
    const now = new Date();

    const updatedStudents = students.map((student) => {
 

      let feeStatus = student.feeStatus || "Unpaid";

     
      if (student.nextDueDate && now > new Date(student.nextDueDate)) {
        feeStatus = "Unpaid";
      }

      return {
        ...student._doc,
        feeStatus
      };
    });

    res.status(200).json({
      success: true,
      data: updatedStudents
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const generateStudentPDF = async (req, res) => {
  const students = await Student.find();

let rows = students.map((s, index) => `
<tr>
  <td>${s.GrNumber}</td>
  <td>${s.StudentName}</td>
  <td>${s.FatherName}</td>
  <td>${s.Class}</td>
  <td>${s.Gender}</td>
  <td>${new Date(s.DateOfBirth).toLocaleDateString()}</td>
  <td>${new Date(s.DateOfAdmission).toLocaleDateString()}</td>
  <td>${s.MonthlyFee}</td>
  <td>${s.FeeStatus}</td>
</tr>
`).join("");

  const html = `
  <html>
  <head>
  <style>
  body{
  font-family: Arial;
  }

  table{
  width:100%;
  border-collapse: collapse;
  }

  th,td{
  border:1px solid black;
  padding:8px;
  text-align:center;
  }

  th{
  background:#eee;
  }

  h2{
  text-align:center;
  }
  </style>
  </head>

  <body>

  <h2>Student List</h2>

  <table>

  <thead>
  <tr>
  <th>GR#</th>
  <th>Student</th>
  <th>Father</th>
  <th>Class</th>
  <th>Gender</th>
  <th>DOB</th>
  <th>Admission</th>
  <th>Fee</th>
  <th>Fee Status</th>
  </tr>
  </thead>

  <tbody>
  ${rows}
  </tbody>

  </table>

  </body>
  </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdf = await page.pdf({ format: "A4" });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=students.pdf",
  });

  res.send(pdf);
};





module.exports = {
    AddStudent,
    deleteStudent,
    EditStudent,
    getStudent,
    generateStudentPDF
}