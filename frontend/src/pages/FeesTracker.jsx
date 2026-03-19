"use client";

import React, { useState, useMemo } from "react";
import { RefreshCw, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { useStudent } from "../Store/StudentData";
import { useStudentFilters } from "../Hooks/filterStudent"
import StatCard from "@/components/StatCard";
import { MonthsModal } from "../components/Monthlymodel";
import { StudentTable } from "../components/Feestable";
import { SearchFilter } from "@/components/SearchFilter";

function FeesTrackerContent() {
  const { students, loading, markPaid, markUnpaid, getStudents } = useStudent();

  // ✅ FILTER HOOK
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

  // ✅ MODAL STATE
  const [modalState, setModalState] = useState({
    isOpen: false,
    student: null,
    type: "paid",
  });

  // ✅ MODAL FUNCTIONS
  const openMarkPaid = (student) => {
    setModalState({ isOpen: true, student, type: "paid" });
  };

  const openMarkUnpaid = (student) => {
    setModalState({ isOpen: true, student, type: "unpaid" });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, student: null, type: "paid" });
  };

  const handleConfirm = async (months) => {
    if (!modalState.student) return;

    if (modalState.type === "paid") {
      await markPaid(modalState.student._id, months);
    } else {
      await markUnpaid(modalState.student._id, months);
    }

    closeModal();
  };

  // ✅ STATS
  const stats = useMemo(() => {
    let totalPaid = 0;
    let totalUnpaid = 0;
    let totalAmount = 0;

    students.forEach((s) => {
      const totalMonths = s.totalMonths?.length || 0;
      const paidMonths = s.paidMonths?.length || 0;

      const unpaidMonths = totalMonths - paidMonths;

      if (unpaidMonths === 0) totalPaid++;
      else totalUnpaid++;

      totalAmount += s.MonthlyFee * paidMonths;
    });

    return { totalPaid, totalUnpaid, totalAmount };
  }, [students]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* ✅ MODAL */}
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
        
        {/* ✅ HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Fees Tracker
            </h1>
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

        {/* ✅ STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard
            label="Total Students"
            value={students.length}
            icon={Users}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
            textColor="text-blue-900"
          />
          <StatCard
            label="Fees Collected"
            value={`PKR ${stats.totalAmount.toLocaleString()}`}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
            textColor="text-emerald-900"
          />
          <StatCard
            label="Pending Payments"
            value={stats.totalUnpaid}
            icon={AlertTriangle}
            gradient="bg-gradient-to-br from-red-500 to-red-600"
            textColor="text-red-900"
          />
        </div>

        {/* ✅ SEARCH + FILTER */}
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          filter={feeFilter}          // 🔥 FIX
          onFilterChange={setFeeFilter} // 🔥 FIX
        />

        {/* ✅ TABLE */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <StudentTable
            students={filteredStudents}
            onMarkPaid={openMarkPaid}
            onMarkUnpaid={openMarkUnpaid}
            loading={loading}
          />

          {/* ✅ FOOTER */}
          <div className="border-t-2 border-gray-100 bg-gray-50 px-6 py-5">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">
                  Total
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.length}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">
                  Fees Collected
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  PKR {stats.totalAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">
                  Pending
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.totalUnpaid} students
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FeesTrackerContent;