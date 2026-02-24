import { useState } from 'react';

import StudentTable from '@/components/Table';


const App = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      id: "1",
      grNumber: "GR-001",
      firstName: "Ali",
      lastName: "Khan",
      fatherName: "Ahmed Khan",
      className: "10-A",
      gender: "Male",
      dob: "2008-05-12",
      admissionDate: "2022-04-01",
      monthlyFee: 5000,
    },
    {
      id: "2",
      grNumber: "GR-002",
      firstName: "Ayesha",
      lastName: "Malik",
      fatherName: "Imran Malik",
      className: "9-B",
      gender: "Female",
      dob: "2009-08-21",
      admissionDate: "2023-03-15",
    }
  ];
  const handleSelectStudent = (student) => {
    setSelectedStudent({
      ...student,
      id: 'STU432101F',
      firstName: student.firstName.toUpperCase(),
      lastName: student.lastName.toUpperCase(),
      gender: student.gender.toUpperCase(),
      email: 'michellelivingston@gmail.com',
      address: 'No.11 Tony Ave Shomolu Lagos Nigeria',
      department: student.department.toUpperCase(),
      class: 'SS2',
      dateCreated: '26TH SEPTEMBER 2015',
      status: 'CURRENT'
    });
  };

  return (
    <div className="flex flex-col ">

      <StudentTable
        students={students}
        onSelectStudent={handleSelectStudent}
      />
    </div>



  );
}

export default App;