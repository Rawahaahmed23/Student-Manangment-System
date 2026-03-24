import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StudentCard from "../components/StudentCard";
import { Edit2, Trash2, Users, ChevronLeft, ChevronRight } from "lucide-react";
import TableControl from "@/components/TableControl";
import { useNavigate } from "react-router-dom";
import { useStudent } from "@/Store/StudentData";
import { useStudentFilters } from "@/Hooks/filterStudent";
import DeleteConfirmPopup from "@/components/Popup";

const ITEMS_PER_PAGE = 7;

const GENDER_COLORS = {
  Male: "bg-sky-50 text-sky-600",
  Female: "bg-pink-50 text-pink-600",
};

function Avatar({ firstName, lastName, profileImage, size = "md" }) {
  const initials = `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`;
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={firstName}
        className={`${sizeClass} rounded-xl object-cover`}
      />
    );
  }
  return (
    <div
      className={`${sizeClass} rounded-xl bg-slate-100 flex items-center justify-center font-semibold text-slate-500 shrink-0`}
    >
      {initials}
    </div>
  );
}

function StudentTable({ students = [] }) {
  const { deleteStudent } = useStudent();
  const navigate = useNavigate();

  const {
    search,
    setSearch,
    classFilter,
    setClassFilter,
    genderFilter,
    setGenderFilter,
    filteredStudents,
  } = useStudentFilters(students);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const emptyRowsCount = ITEMS_PER_PAGE - paginatedStudents.length;

  const [popup, setPopup] = useState({
    open: false,
    studentId: null,
    studentName: "",
  });

  const handleDeleteClick = (student) => {
    setPopup({
      open: true,
      studentId: student._id,
      studentName: student.StudentName,
    });
  };

  const handleConfirmDelete = () => {
    deleteStudent(popup.studentId);
    setPopup({ open: false, studentId: null, studentName: "" });
  };

  const handleCancelDelete = () => {
    setPopup({ open: false, studentId: null, studentName: "" });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">

      <DeleteConfirmPopup
        isOpen={popup.open}
        studentName={popup.studentName}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <TableControl
        search={search}
        setSearch={setSearch}
        classFilter={classFilter}
        setClassFilter={setClassFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
      />

      <div className="max-w-7xl mx-auto space-y-5">

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Users className="w-4 h-4 text-slate-400" />
              <span>
                <span className="font-semibold text-slate-700">
                  {filteredStudents.length}
                </span>{" "}
                students
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Showing page {page} of {totalPages || 1}
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-100 bg-slate-50/60">
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 pl-6 w-16">GR#</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Student</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Father</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">Class</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">Gender</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">DOB</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">Admission</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">Fee</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">Fee Status</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 pr-6 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Real rows */}
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <TableRow
                    key={student._id}
                    className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors h-[57px]"
                  >
                    <TableCell className="pl-6 py-3.5">
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        {student.GrNumber}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar
                          firstName={student.StudentName}
                          lastName=""
                          profileImage={student.profileImage?.url}
                          size="sm"
                        />
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">
                            {student.StudentName}
                          </p>
                          <p className="text-xs text-slate-400">Student</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-3.5">
                      <span className="text-sm text-slate-600">
                        {student.FatherName}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 text-center">
                      <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        {student.Class}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 text-center">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${GENDER_COLORS[student.Gender]}`}
                      >
                        {student.Gender}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 text-center">
                      <span className="text-sm text-slate-500">
                        {new Date(student.DateOfBirth).toLocaleDateString()}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 text-center">
                      <span className="text-sm text-slate-500">
                        {new Date(student.DateOfAdmission).toLocaleDateString()}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 text-center">
                      <span className="text-sm font-semibold text-slate-800">
                        Rs {student.MonthlyFee}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 text-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          student.feeStatus === "Paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {student.feeStatus}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 pr-6 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-1.5 rounded-lg hover:bg-blue-50"
                          onClick={() => navigate(`/edit-student/${student._id}`)}
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-400 hover:text-blue-500" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-red-50"
                          onClick={() => handleDeleteClick(student)}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-[57px]">
                  <TableCell colSpan={10} className="text-center text-slate-400 text-sm">
                    No students found.
                  </TableCell>
                </TableRow>
              )}

              {/* Empty placeholder rows to keep fixed height */}
              {Array.from({ length: paginatedStudents.length === 0 ? emptyRowsCount - 1 : emptyRowsCount }).map((_, i) => (
                <TableRow key={`empty-${i}`} className="h-[57px] border-b border-slate-50">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <TableCell key={j} />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50 bg-slate-50/40">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    page === n
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {n}
                </button>
              ))}
              {totalPages > 7 && <span className="text-slate-400 px-1">…</span>}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-40 transition-colors shadow-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" />
              <span>
                <span className="font-semibold text-slate-700">
                  {filteredStudents.length}
                </span>{" "}
                students
              </span>
            </span>
            <span className="text-xs text-slate-400">
              Page {page} of {totalPages || 1}
            </span>
          </div>

          {paginatedStudents.length > 0 ? (
            paginatedStudents.map((student) => (
              <StudentCard key={student._id} student={student} />
            ))
          ) : (
            <p className="text-center text-slate-400 text-sm py-10">
              No students found.
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-sm text-slate-500">
              Page <span className="font-semibold text-slate-700">{page}</span> of {totalPages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-40 transition-colors shadow-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentTable;