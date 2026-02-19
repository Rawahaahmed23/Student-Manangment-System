import React from 'react';
import { Users } from 'lucide-react';

function StudentOverview({ students }) {
  const boys = students.filter((s) => s.gender === "Boy").length;
  const girls = students.filter((s) => s.gender === "Girl").length;

  const classDistribution = {};
  students.forEach((s) => {
    classDistribution[s.class] = (classDistribution[s.class] || 0) + 1;
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
        <div className="bg-blue-100 rounded-xl p-4 sm:p-5 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm text-slate-600 font-semibold uppercase">Boys</p>
           
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">
            {boys}
          </h3>
         
        </div>



        <div className="bg-blue-100 rounded-xl p-4 sm:p-5 border border-pink-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm text-slate-600 font-semibold uppercase">Girls</p>
         
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">
            {girls}
          </h3>
         
        </div>
      </div>

      {/* Class Distribution */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
          Class Distribution
        </h4>
        <div className="space-y-3">
          {Object.entries(classDistribution).map(([cls, count]) => (
            <div 
              key={cls} 
              className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200"
            >
              <span className="text-sm sm:text-base font-semibold text-slate-700">
                {cls}
              </span>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(count / students.length) * 100}%` }}
                  ></div>
                </div>
                <span className="bg-blue-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg min-w-[3rem] text-center">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentOverview;