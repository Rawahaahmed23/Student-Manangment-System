import React from 'react';
import { UserPlus, Calendar } from 'lucide-react';

function RecentStudents({ students }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 h-full shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <UserPlus size={20} className="text-green-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">
            Recent Students
          </h3>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold">
          {students.length} New
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {students.map((student) => (
          <div 
            key={student.id}
            className="bg-slate-50 hover:bg-slate-100 rounded-xl p-3 sm:p-4 border border-slate-200"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${
                student.gender === 'Boy' 
                  ? 'bg-blue-500' 
                  : 'bg-pink-500'
              } flex items-center justify-center text-white font-bold text-base sm:text-lg`}>
                {student.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                  <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                    {student.name}
                  </h4>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2 sm:px-3 py-1 rounded-lg ${
                    student.gender === 'Boy'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {student.gender}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-slate-600">
                  <span className="font-semibold bg-slate-200 px-2 py-1 rounded-lg inline-block w-fit">
                    {student.class}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar size={12} />
                    <span>{new Date(student.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm sm:text-base">
        View All Students →
      </button>
    </div>
  );
}

export default RecentStudents;