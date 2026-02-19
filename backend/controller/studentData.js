const Student = require('../schema/StudentSchema')

const AddStudent =async(req,res)=>{
    try{
    const {GrNumber,
        StudentName,FatherName,
        Class,
        Gender,
        DateOfBirth,
        DateOfAdmission,
        MonthlyFee,
        FeeStatus
        ,LastFeeUpdate} = req.body

   const student = new Student({
      GrNumber,
      StudentName,
      FatherName,
      Class,
      Gender,
      DateOfBirth: new Date(DateOfBirth),
      DateOfAdmission: new Date(DateOfAdmission),
      MonthlyFee,
      FeeStatus,
      LastFeeUpdate: new Date(LastFeeUpdate)
    });

      await student.save();
    res.status(201).json({ message: "Student Added Successfully" });


    }catch(error){
  res.status(500).json({ message: error.message });
    }
}


const deleteStudent =async(req,res)=>{}

const updateStudent =async(req,res)=>{}
const getStudent =async(req,res)=>{}




module.exports = {
    AddStudent,
    deleteStudent,
    updateStudent,
    getStudent
}