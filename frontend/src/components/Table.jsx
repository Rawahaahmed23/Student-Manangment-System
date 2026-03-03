import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, Phone, Calendar, Users, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";

const GENDER_COLORS = {
  Male: "bg-sky-50 text-sky-600",
  Female: "bg-pink-50 text-pink-600",
};

function Avatar({ firstName, lastName, profileImage, size = "md" }) {
  const initials = `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`;
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  if (profileImage) {
    return <img src={profileImage} alt={firstName} className={`${sizeClass} rounded-xl object-cover`} />;
  }
  return (
    <div className={`${sizeClass} rounded-xl bg-slate-100 flex items-center justify-center font-semibold text-slate-500 shrink-0`}>
      {initials}
    </div>
  );
}

/* ─── Mobile Card ─── */
function StudentCard({ student }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar {...student} />
          <div>
            <p className="font-semibold text-slate-800 text-sm leading-tight">
              {student.firstName} {student.lastName}
            </p>
            <p className="text-xs text-slate-400">GR# {student.grNumber}</p>
          </div>
        </div>
        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
          {student.className}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-50" />

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Father</p>
          <p className="text-slate-700 font-medium truncate">{student.fatherName}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Gender</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${GENDER_COLORS[student.gender] ?? "bg-slate-100 text-slate-600"}`}>
            {student.gender}
          </span>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Date of Birth</p>
          <p className="text-slate-600 flex items-center gap-1"><Calendar className="w-3 h-3" />{student.dateOfBirth}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Admission</p>
          <p className="text-slate-600 flex items-center gap-1"><Calendar className="w-3 h-3" />{student.dateOfAdmission}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Monthly Fee</p>
          <p className="font-semibold text-slate-800">Rs. {student.monthlyFee}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Contact</p>
          <p className="text-slate-600 flex items-center gap-1"><Phone className="w-3 h-3" />{student.contact}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
          <Edit2 className="w-3.5 h-3.5" /> Edit
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors">
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
function StudentTable({ students = [] }) {
  const [page, setPage] = useState(1);
  const totalPages = 12;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Student Directory</h1>
            <p className="text-slate-400 text-sm mt-0.5">Manage and view all student records</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Search bar */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-400 shadow-sm w-48 lg:w-64">
              <Search className="w-4 h-4 shrink-0" />
              <input
                placeholder="Search students..."
                className="bg-transparent outline-none text-slate-600 placeholder-slate-400 w-full text-sm"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* ── DESKTOP TABLE (lg+) ── */}
        <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

          {/* Table top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Users className="w-4 h-4 text-slate-400" />
              <span><span className="font-semibold text-slate-700">{students.length}</span> students</span>
            </div>
            <span className="text-xs text-slate-400">Showing page {page} of {totalPages}</span>
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
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">Contact</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 pr-6 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, i) => (
                <TableRow
                  key={student.id}
                  className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group"
                >
                  {/* GR Number */}
                  <TableCell className="pl-6 py-3.5">
                    <span className="text-xs font-mono font-semibold text-slate-400">{student.grNumber}</span>
                  </TableCell>

                  {/* Student */}
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar {...student} size="sm" />
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{student.firstName} {student.lastName}</p>
                        <p className="text-xs text-slate-400">Student</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Father */}
                  <TableCell className="py-3.5">
                    <span className="text-sm text-slate-600">{student.fatherName}</span>
                  </TableCell>

                  {/* Class */}
                  <TableCell className="py-3.5 text-center">
                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                      {student.className}
                    </span>
                  </TableCell>

                  {/* Gender */}
                  <TableCell className="py-3.5 text-center">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${GENDER_COLORS[student.gender] ?? "bg-slate-100 text-slate-600"}`}>
                      {student.gender}
                    </span>
                  </TableCell>

                  {/* DOB */}
                  <TableCell className="py-3.5 text-center">
                    <span className="text-sm text-slate-500">{student.dateOfBirth}</span>
                  </TableCell>

                  {/* Admission */}
                  <TableCell className="py-3.5 text-center">
                    <span className="text-sm text-slate-500">{student.dateOfAdmission}</span>
                  </TableCell>

                  {/* Fee */}
                  <TableCell className="py-3.5 text-center">
                    <span className="text-sm font-semibold text-slate-800">Rs. {student.monthlyFee}</span>
                  </TableCell>

                  {/* Contact */}
                  <TableCell className="py-3.5 text-center">
                    <span className="text-sm text-slate-500">{student.contact}</span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-3.5 pr-6 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                        <Edit2 className="w-3.5 h-3.5 text-slate-400 hover:text-blue-500" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Table Pagination */}
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
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-40 transition-colors shadow-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── MOBILE CARDS (< lg) ── */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" />
              <span><span className="font-semibold text-slate-700">{students.length}</span> students</span>
            </span>
            <span className="text-xs text-slate-400">Page {page} of {totalPages}</span>
          </div>

          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}

          {/* Mobile Pagination */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-sm text-slate-500">
              Page <span className="font-semibold text-slate-700">{page}</span> of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
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