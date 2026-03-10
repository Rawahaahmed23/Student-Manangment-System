import { createContext, useContext, useEffect, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/Student/getStudent",{
        method:"GET"
      });
      const result = await res.json();

     
      setStudents(result.data ?? []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, getStudents, loading }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);