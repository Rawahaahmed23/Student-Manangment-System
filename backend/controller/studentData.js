const Student = require('../schema/StudentSchema')


const { uploadToCloudinary } = require("../config/cloudnary")


const moment = require('moment'); 

const AddStudent = async (req, res) => {
  try {
    const {
      GrNumber, StudentName, FatherName,
      Class, Gender, DateOfBirth,
      DateOfAdmission, MonthlyFee,
      
    } = req.body;
     const existingStudent = await Student.findOne({ GrNumber });
    if(existingStudent){
      return res.status(400).json({ message: "Student already exists" });
    }
    const profileImage = req.body.profileImage;
    if(req.file){
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      profileImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      }
    }

    const student = new Student({
      GrNumber,
      StudentName,
      FatherName,
      Class,
      Gender,
      DateOfBirth: moment(DateOfBirth, 'DD-MMM-YYYY').toDate(),         
      DateOfAdmission: moment(DateOfAdmission, 'DD-MMM-YYYY').toDate(),
      MonthlyFee,
     
      
      profileImage
    });


 
    await student.save();
    res.status(201).json({ message: "Student Added Successfully", student });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteStudent =async(req,res)=>{
  try{

    const {_id} = req.params
    const student = await Student.findById(_id)
    if(!student){
      return res.status(400).json({message:'Student Not Found'})
    }
        if (student.ProfilePicture) {
          const publicId = student.ProfilePicture
            .split('/').pop()
            .split('.')[0];
          await cloudinary.uploader.destroy(`students/${publicId}`);
        }
    
         await Student.findByIdAndDelete(_id);
        return res.status(200).json({ message: "Student Deleted Successfully" });
  }
 catch (error) {
    return res.status(500).json({ message: error.message });
  }

}

const EditStudent = async (req, res) => {
  try {
    const { _id } = req.params;

    const student = await Student.findById(_id);
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    const {
      GrNumber,
      StudentName,
      FatherName,
      Class,
      Gender,
      DateOfBirth,
      DateOfAdmission,
      MonthlyFee,
      FeeStatus,
      LastFeeUpdate,
    } = req.body;

    
    if (GrNumber && GrNumber !== student.GrNumber) {
      const existing = await Student.findOne({ GrNumber });
      if (existing) {
        return res.status(400).json({ message: "GrNumber already exists for another student" });
      }
    }

    let profileImage = student.profileImage;

    if (req.file) {
   
      if (student.profileImage && student.profileImage.public_id) {
        await cloudinary.uploader.destroy(student.profileImage.public_id);
      }

      const uploadResult = await uploadToCloudinary(req.file.buffer);
      profileImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

  
    const updatedData = {
      ...(GrNumber && { GrNumber }),
      ...(StudentName && { StudentName }),
      ...(FatherName && { FatherName }),
      ...(Class && { Class }),
      ...(Gender && { Gender }),
      ...(DateOfBirth && { DateOfBirth: moment(DateOfBirth, 'DD-MMM-YYYY').toDate() }),
      ...(DateOfAdmission && { DateOfAdmission: moment(DateOfAdmission, 'DD-MMM-YYYY').toDate() }),
      ...(MonthlyFee !== undefined && { MonthlyFee }),
      ...(FeeStatus && { FeeStatus }),
      ...(LastFeeUpdate && { LastFeeUpdate: moment(LastFeeUpdate, 'DD-MMM-YYYY').toDate() }),
      profileImage,
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
    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



module.exports = {
    AddStudent,
    deleteStudent,
    EditStudent,
    getStudent
}