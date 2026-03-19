import { useState, useMemo } from "react";

export function useStudentFilters(students) {

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [feeFilter, setFeeFilter] = useState("all"); // 🔥 NEW

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {

      const unpaidMonths =
        student.totalMonths.length - student.paidMonths.length;

      // 🔍 Search
      const matchesSearch =
        student.StudentName?.toLowerCase().includes(search.toLowerCase()) ||
        student.FatherName?.toLowerCase().includes(search.toLowerCase());

      // 🎓 Class
      const matchesClass = classFilter
        ? student.Class === classFilter
        : true;

      // 🚻 Gender
      const matchesGender = genderFilter
        ? student.Gender === genderFilter
        : true;

      // 💰 Fee Status (NEW)
      const matchesFee =
        feeFilter === "all" ||
        (feeFilter === "paid" && unpaidMonths === 0) ||
        (feeFilter === "unpaid" && unpaidMonths > 0);

      return matchesSearch && matchesClass && matchesGender && matchesFee;

    });
  }, [students, search, classFilter, genderFilter, feeFilter]);

  return {
    search,
    setSearch,
    classFilter,
    setClassFilter,
    genderFilter,
    setGenderFilter,
    feeFilter,          // 🔥 expose
    setFeeFilter,       // 🔥 expose
    filteredStudents
  };
}