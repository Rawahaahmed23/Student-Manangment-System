"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";


const Badge = ({ status }) => {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
        Paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
       Unpaid
    </span>
  );
};

export const StudentTable = ({
  students,
  onMarkPaid,
  onMarkUnpaid,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading students...</p>
        </div>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-400 text-lg font-medium">No students found</p>
          <p className="text-gray-400 text-sm">
            Try adjusting your filters or search
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* DESKTOP (lg+) */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {["Student", "Roll", "Class", "Father", "Gender", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-blue-50/60 transition-colors">
                <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">{student.StudentName}</td>
                <td className="px-5 py-4 text-gray-600">{student.GrNumber}</td>
                <td className="px-5 py-4 text-gray-600">{student.Class}</td>
                <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{student.FatherName}</td>
                <td className="px-5 py-4 text-gray-600">{student.Gender}</td>
                <td className="px-5 py-4">
                  <Badge status={student.FeeStatus || "Unpaid"} />
                </td>
                <td className="px-5 py-4">
                  {(!student.FeeStatus || student.FeeStatus === "Unpaid") ? (
                    <button onClick={() => onMarkPaid(student)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-green-200 transition-colors whitespace-nowrap">
                      <TrendingUp size={14} /> Mark Paid
                    </button>
                  ) : (
                    <button onClick={() => onMarkUnpaid(student)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                      <TrendingDown size={14} /> Edit Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TABLET (md–lg) */}
      <div className="hidden md:block lg:hidden overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {["Student", "Class", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-blue-50/60 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-800 whitespace-nowrap">{student.StudentName}</p>
                  <p className="text-xs text-gray-400">{student.GrNumber} · {student.FatherName}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-700">{student.Class}</p>
                  <p className="text-xs text-gray-400">{student.Gender}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge status={student.FeeStatus || "Unpaid"} />
                </td>
                <td className="px-4 py-3">
                  {(!student.FeeStatus || student.FeeStatus === "Unpaid") ? (
                    <button onClick={() => onMarkPaid(student)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-green-200 transition-colors whitespace-nowrap">
                      <TrendingUp size={14} /> Mark Paid
                    </button>
                  ) : (
                    <button onClick={() => onMarkUnpaid(student)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                      <TrendingDown size={14} /> Edit Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE (<md) */}
      <div className="md:hidden space-y-3 px-1">
        {students.map((student) => (
          <div key={student._id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base leading-tight">{student.StudentName}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Roll {student.GrNumber} · Class {student.Class}</p>
              </div>
              <Badge status={student.FeeStatus || "Unpaid"} />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-3">
              <div>
                <span className="text-gray-400 text-xs">Father</span>
                <p className="text-gray-700 font-medium truncate">{student.FatherName}</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">Gender</span>
                <p className="text-gray-700 font-medium">{student.Gender}</p>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-gray-100 pt-3">
              {(!student.FeeStatus || student.FeeStatus === "Unpaid") ? (
                <button onClick={() => onMarkPaid(student)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 text-xs font-semibold hover:bg-green-200 transition-colors">
                  <TrendingUp size={14} /> Mark Paid
                </button>
              ) : (
                <button onClick={() => onMarkUnpaid(student)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center gap-1 text-xs font-semibold hover:bg-blue-700 transition-colors">
                  <TrendingDown size={14} /> Edit Status
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};