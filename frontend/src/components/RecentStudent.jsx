import React from "react";
import { UserPlus, Calendar } from "lucide-react";
import { useStudent } from "@/Store/StudentData";

function RecentStudents() {
  const { students } = useStudent();

  const recentStudents = [...students]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 h-full shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <UserPlus size={20} className="text-green-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">
            Recent Students
          </h3>
        </div>

        <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold">
          {recentStudents.length} New
        </span>
      </div>

      {/* Students List */}
      <div className="space-y-3 sm:space-y-4">
        {recentStudents.map((student) => (
          <div
            key={student._id}
            className="bg-slate-50 hover:bg-slate-100 rounded-xl p-3 sm:p-4 border border-slate-200 transition"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              
      
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                {student.profileImage?.url ? (
                  <img
                    src={student.profileImage.url}
                    alt={student.StudentName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-white font-bold text-lg ${
                      student.Gender === "Male"
                        ? "bg-blue-500"
                        : "bg-pink-500"
                    }`}
                  >
                    {student.StudentName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  
                  {/* Name */}
                  <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                    {student.StudentName}
                  </h4>

               
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                      student.Gender === "Male"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {student.Gender}
                  </span>
                </div>

                {/* Class + Date */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-slate-600">Class
                  
                  <span className="font-semibold bg-slate-200 px-2 py-1 rounded-lg w-fit">
                    {student.Class}
                  </span>

                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar size={12} />
                    <span>
                      {new Date(student.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentStudents;