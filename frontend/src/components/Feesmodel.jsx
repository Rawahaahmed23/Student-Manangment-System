"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const FeeRecordsModal = ({ student, onClose }) => {
const latestYear = student?.feeRecords?.length > 0
  ? Math.max(...student.feeRecords.map((r) => r.year))
  : null;

  const [selectedYear, setSelectedYear] = useState(latestYear);

  const currentRecord = student?.feeRecords?.find((r) => r.year === selectedYear);
  const paidMonths = currentRecord?.paidMonths ?? [];
  const paidCount = paidMonths.length;
  const unpaidCount = 12 - paidCount;
  const totalPaid = student?.MonthlyFee ? paidCount * student.MonthlyFee : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-5">
          <h3 className="text-gray-900 font-bold text-xl">Fee Records</h3>
          <p className="text-gray-400 text-sm mt-1">
            {student?.StudentName} · GR {student?.GrNumber} · Class {student?.Class}
          </p>
        </div>

        {/* No Records */}
        {(!student?.feeRecords || student.feeRecords.length === 0) ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            No fee records found.
          </div>
        ) : (
          <>
            {/* Year Tabs */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              {[...student.feeRecords]
                .sort((a, b) => b.year - a.year)
                .map((record) => (
                  <button
                    key={record.year}
                    onClick={() => setSelectedYear(record.year)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      selectedYear === record.year
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-blue-200 text-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    {record.year}
                  </button>
                ))}
            </div>

            {/* Months Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-5">
              {MONTHS.map((month) => {
                const isPaid = paidMonths.includes(month);
                return (
                  <div
                    key={month}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                      isPaid
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-blue-100 text-blue-300"
                    }`}
                  >
                    <span>{month.slice(0, 3)}</span>
                    <span className="text-base">{isPaid ? "✓" : "✗"}</span>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{paidCount}</p>
                <p className="text-xs text-blue-400 font-medium mt-0.5">Paid</p>
              </div>
              <div className="bg-white border border-blue-100 rounded-xl px-3 py-3 text-center">
                <p className="text-2xl font-bold text-blue-300">{unpaidCount}</p>
                <p className="text-xs text-blue-300 font-medium mt-0.5">Unpaid</p>
              </div>
              <div className="bg-blue-600 border border-blue-600 rounded-xl px-3 py-3 text-center">
                <p className="text-lg font-bold text-white">
                  {totalPaid !== null ? totalPaid.toLocaleString() : "—"}
                </p>
                <p className="text-xs text-blue-100 font-medium mt-0.5">Rs Paid</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeeRecordsModal;