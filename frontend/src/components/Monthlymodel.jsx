"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export const MonthsModal = ({
  isOpen,
  title,
  student,
  mode, // "pay" | "unpay"
  onConfirm,
  onClose,
  isLoading = false,
}) => {
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [confirming, setConfirming] = useState(false);

  const monthOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  // "pay" mode => show unpaid months | "unpay" mode => show paid months
  const availableMonths = mode === "pay"
    ? (student?.totalMonths || []).filter((m) => !(student?.paidMonths || []).includes(m))
    : (student?.paidMonths || []);

  const sortedMonths = [...availableMonths].sort(
    (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
  );

  useEffect(() => {
    if (isOpen) setSelectedMonths([]);
  }, [isOpen, student]);

  if (!isOpen) return null;

  const toggleMonth = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const handleConfirm = async () => {
    if (selectedMonths.length === 0) return;
    setConfirming(true);
    await onConfirm(selectedMonths);
    setConfirming(false);
    setSelectedMonths([]);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={22} />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          {mode === "pay" ? "Select months to mark as paid:" : "Select months to mark as unpaid:"}
        </p>

        {/* Month Grid */}
        {sortedMonths.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 font-medium">
              {mode === "pay" ? "All months already paid ✓" : "No paid months yet"}
            </p>
          </div>
        ) : (
          <>
            {/* Select All / Clear */}
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setSelectedMonths([...sortedMonths])}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Select All
              </button>
              <span className="text-gray-200">|</span>
              <button
                onClick={() => setSelectedMonths([])}
                className="text-xs text-gray-400 font-semibold hover:underline"
              >
                Clear
              </button>
              <span className="ml-auto text-xs text-gray-400">
                {selectedMonths.length} / {sortedMonths.length} selected
              </span>
            </div>

            {/* Month Checkboxes */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {sortedMonths.map((month) => {
                const isSelected = selectedMonths.includes(month);
                return (
                  <button
                    key={month}
                    onClick={() => toggleMonth(month)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      isSelected
                        ? mode === "pay"
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-red-500 border-red-500 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {month.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Footer Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={confirming || isLoading}
            className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirming || isLoading || selectedMonths.length === 0}
            className={`px-5 py-2.5 rounded-xl text-white font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 ${
              mode === "pay" ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirming || isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              `Confirm (${selectedMonths.length})`
            )}
          </button>
        </div>

      </div>
    </div>
  );
};