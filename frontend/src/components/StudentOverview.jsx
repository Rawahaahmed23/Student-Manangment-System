import React from 'react';
import { Users } from 'lucide-react';
import { useStudentFilters } from '@/Hooks/filterStudent';

function StudentOverview({ students, filteredStudents }) {
  const { setClassFilter, classFilter } = useStudentFilters(students);

  const boys = filteredStudents.filter((s) => s.Gender === "Male").length;
  const girls = filteredStudents.filter((s) => s.Gender === "Female").length;

  const classDistribution = {};
  filteredStudents.forEach((s) => {
    classDistribution[s.Class] = (classDistribution[s.Class] || 0) + 1;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 h-full shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <Users size={20} className="text-blue-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800">
          Students Overview
        </h3>
      </div>

      {/* Gender Distribution */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-sky-50 rounded-xl p-4 sm:p-5 border border-sky-100">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold uppercase mb-2">Boys</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-sky-600">{boys}</h3>
        </div>
        <div className="bg-pink-50 rounded-xl p-4 sm:p-5 border border-pink-100">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold uppercase mb-2">Girls</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-pink-500">{girls}</h3>
        </div>
      </div>

      {/* Class Distribution */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
          Class Distribution
        </h4>
        <div className="space-y-3">
          {Object.entries(classDistribution)
            .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
            .map(([cls, count]) => (
              <div
                key={cls}
                className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-700">
                  Class {cls}
                </span>
                <div className="flex items-center gap-3">
                 
                  <span className="bg-blue-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-lg min-w-[3rem] text-center">
                    {count}
                  </span>
                </div>
              </div>
            ))}

          {Object.keys(classDistribution).length === 0 && (
            <p className="text-center text-slate-400 text-sm py-4">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentOverview;