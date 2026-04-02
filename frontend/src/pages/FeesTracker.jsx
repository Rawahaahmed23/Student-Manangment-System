"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useStudent } from "../Store/StudentData";
import { useStudentFilters } from "../Hooks/filterStudent";
import { toast, ToastContainer } from "react-toastify";
import { MonthsModal } from "../components/Monthlymodel";
import { StudentTable } from "../components/Feestable";
import FeeRecordsModal from "../components/Feesmodel";
import { SearchFilter } from "@/components/SearchFilter";





const CLASS_OPTIONS = [
  { value: "", label: "All Classes" },
  { value: "Reception", label: "Reception" },
  { value: "Junior", label: "Junior" },
  { value: "Senior", label: "Senior" },
  ...[1,2,3,4,5,6,7,8].map(n => ({ value: `Class ${n}`, label: `Class ${n}` })),
  { value: "Hifz", label: "Hifz" },
  { value: "Nazra", label: "Nazra" },
];





function FeesTrackerContent() {
  const { students, loading, markPaid, markUnpaid, getStudents, deleteFeeRecord } = useStudent();

  const {
    search,
    setSearch,
    classFilter,
    setClassFilter,
    genderFilter,
    setGenderFilter,
    feeFilter,
    setFeeFilter,
    filteredStudents,
  } = useStudentFilters(students);

  const [modalState, setModalState] = useState({
    isOpen: false,
    student: null,
    type: "paid",
  });

  const [viewStudent, setViewStudent] = useState(null);

  const openMarkPaid = (student) => {
    setModalState({ isOpen: true, student, type: "paid" });
  };

  const openMarkUnpaid = (student) => {
    setModalState({ isOpen: true, student, type: "unpaid" });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, student: null, type: "paid" });
  };

  const switchToPaidModal = (student) => {
    setModalState({ isOpen: true, student, type: "paid" });
  };

  const handleConfirm = async (months, year) => {
    if (!modalState.student) return;
    try {
      let result;
      if (modalState.type === "paid") {
        result = await markPaid(modalState.student._id, months, year);
        if (result?.success === false) throw new Error(result.message);
        toast.success("Payment marked successfully!");
      } else {
        result = await markUnpaid(modalState.student._id, months, year);
        if (result?.success === false) throw new Error(result.message);
        toast.success("Marked as unpaid successfully!");
      }
      closeModal();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <ToastContainer position="top-right" autoClose={3000} />

      <MonthsModal
        isOpen={modalState.isOpen}
        title={modalState.type === "paid" ? "Mark Payment Received" : "Mark as Unpaid"}
        mode={modalState.type}
        student={modalState.student}
        onConfirm={handleConfirm}
        onClose={closeModal}
        onSwitchToPaid={() => switchToPaidModal(modalState.student)}
        isLoading={loading}
      />

      {viewStudent && (
        <FeeRecordsModal
          student={viewStudent}
          onClose={() => setViewStudent(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Fees Tracker</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage student fee payments efficiently
            </p>
          </div>
          <button
            onClick={getStudents}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

     <SearchFilter
  search={search}
  setSearch={setSearch}
  searchPlaceholder="Search by name..."
  filters={[
    {
      value: classFilter,
      onChange: setClassFilter,
      placeholder: "All Classes",
      options: CLASS_OPTIONS,
    },
    {
      value: genderFilter,
      onChange: setGenderFilter,
      placeholder: "All Genders",
      options: [
        { value: "", label: "All Genders" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },
    {
      value: feeFilter,
      onChange: setFeeFilter,
      placeholder: "All Status",
      options: [
        { value: "", label: "All Status" },
        { value: "paid", label: "Paid" },
        { value: "unpaid", label: "Unpaid" },
      ],
    },
  ]}
/>

        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <StudentTable
            students={filteredStudents}
            onMarkPaid={openMarkPaid}
            onMarkUnpaid={openMarkUnpaid}
            onDeleteFees={deleteFeeRecord}
            onViewFees={(student) => setViewStudent(student)}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default FeesTrackerContent;