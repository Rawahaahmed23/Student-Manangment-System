import { useState } from "react";
import StudentTable from "@/pages/Table";
import { useStudent } from "../Store/StudentData";

const StudentData = () => {
  const { students,getf } = useStudent();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSelectStudent = (student) => {
    setSelectedStudent({
      id: student._id,
      grNumber: student.GrNumber,
      studentName: student.StudentName.toUpperCase(),
      fatherName: student.FatherName.toUpperCase(),
      class: student.Class,
      gender: student.Gender.toUpperCase(),
      monthlyFee: student.MonthlyFee,
      feeStatus: student.feeStatus,
      dob: student.DateOfBirth,
      admissionDate: student.DateOfAdmission,
      profileImage: student.profileImage?.url || null,
    });
  };

  return (
    <div className="flex flex-col">
      <StudentTable
        students={students}
        onSelectStudent={handleSelectStudent}
      />
    </div>
  );
};

export default StudentData;