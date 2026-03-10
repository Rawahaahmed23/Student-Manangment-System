import React from 'react';
import { Clock } from "lucide-react";
import { useStudent } from '@/Store/StudentData';

function RecentActivity() {
  const { students } = useStudent();

  // Sort by createdAt descending to get recently added students
  const recentStudents = [...students]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6); // last 3 added students

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 h-full shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <Clock size={20} className="text-blue-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800">
          Recent Activity
        </h3>
      </div>

      <div className="space-y-4">
        {recentStudents.map((student) => (
          <div 
            key={student._id} 
            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200"
          >
            {/* Avatar / Image */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg overflow-hidden">
              {student.profileImage?.url ? (
                <img 
                  src={student.profileImage.url} 
                  alt={student.StudentName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                student.StudentName.charAt(0)
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base text-slate-700 font-medium">
                {student.StudentName}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {new Date(student.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;