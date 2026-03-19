import { createContext, useContext, useEffect, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);





  
  const getStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/Student/getStudent", {
        method: "GET",
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


  const markPaid = async (id, months) => {
  try {
    const res = await fetch(`http://localhost:5000/fee/markpaid/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ months }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    await getStudents();
  } catch (err) {
    console.error(err);
  }
};

const markUnpaid = async (id, months) => {
  try {
    const res = await fetch(`http://localhost:5000/fee/markunpaid//${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ months }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    await getStudents();
  } catch (err) {
    console.error(err);
  }
};

  const editStudent = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/Student/updateStudent/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (res.ok) {
        await getStudents();
      }
      return result;
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/Student/delete/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s._id !== id)); 
      }
      return result;
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, getStudents, editStudent, deleteStudent, loading, markPaid,markUnpaid }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);