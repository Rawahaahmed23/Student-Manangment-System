"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useStudent } from "../Store/StudentData";
import { useStudentFilters } from "../Hooks/filterStudent";
import { toast, ToastContainer } from "react-toastify";
import { MonthsModal } from "../components/Monthlymodel";
import { StudentTable } from "../components/Feestable";
import { SearchFilter } from "@/components/SearchFilter";

function FeesTrackerContent() {
  const { students, loading, markPaid, markUnpaid, getStudents } = useStudent();

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

  const openMarkPaid = (student) => {
    setModalState({ isOpen: true, student, type: "paid" });
  };

  const openMarkUnpaid = (student) => {
    setModalState({ isOpen: true, student, type: "unpaid" });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, student: null, type: "paid" });
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
    <div className="min-h-screen">
      <ToastContainer />

      <MonthsModal
        isOpen={modalState.isOpen}
        title={
          modalState.type === "paid"
            ? "Mark Payment Received"
            : "Mark as Unpaid"
        }
        onConfirm={handleConfirm}
        onClose={closeModal}
        isLoading={loading}
      />

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

        {/* ✅ FIXED: Prop names match exactly what SearchFilter expects */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          classFilter={classFilter}
          setClassFilter={setClassFilter}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          feeFilter={feeFilter}
          setFeeFilter={setFeeFilter}
        />

        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <StudentTable
            students={filteredStudents}
            onMarkPaid={openMarkPaid}
            onMarkUnpaid={openMarkUnpaid}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default FeesTrackerContent;