import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, Phone, Calendar, User, GraduationCap } from "lucide-react";

function StudentTable({ students }) {
  return (
    <div className="w-[90%] mx-auto px-2 sm:px-4 lg:px-6 mt-6">
      <div className="w-full  mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Student Directory</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">Manage and view all student records</p>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          {students.map((student) => (
            <div key={student.id} className="border-b border-gray-200 p-4 hover:bg-blue-50 transition-colors">
              {/* Student Header */}
              <div className="flex items-center gap-3 mb-3">
                {student.profileImage ? (
                  <img
                    src={student.profileImage}
                    alt={student.firstName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white shadow-md">
                    {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">GR# {student.grNumber}</p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {student.className}
                </span>
              </div>

              {/* Student Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Father Name</p>
                  <p className="text-sm font-medium text-gray-900">{student.fatherName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Gender</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    student.gender === 'Male' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {student.gender}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {student.dateOfBirth}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Admission</p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {student.dateOfAdmission}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Monthly Fee</p>
                  <p className="text-sm font-semibold text-gray-900">Rs. {student.monthlyFee}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {student.contact}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium text-blue-700">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium text-red-700">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <Table className="w-full">
            
            {/* Table Header */}
            <TableHeader>
              <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                <TableHead className="text-center font-semibold text-gray-700 py-4">G.R No</TableHead>
                <TableHead className="text-left font-semibold text-gray-700 py-4">Student</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 py-4">Father Name</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 py-4">Class</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 py-4">Gender</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 py-4">DOB</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 py-4">Admission</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 py-4">Fee</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 py-4">Contact</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-blue-50 transition-all duration-200 border-b border-gray-100"
                >
                  {/* GR Number */}
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10  text-blue-700 font-bold rounded-lg">
                      {student.grNumber}
                    </span>
                  </TableCell>

                  {/* Student Name with Profile */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {student.profileImage ? (
                        <img
                          src={student.profileImage}
                          alt={student.firstName}
                          className="w-11 h-11 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-base font-bold text-white shadow-md">
                          {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {student.firstName} {student.lastName}
                        </span>
                        <span className="text-xs text-gray-500">Student</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Father Name */}
                  <TableCell className="text-center">
                    <span className="text-gray-700">{student.fatherName}</span>
                  </TableCell>

                  {/* Class */}
                  <TableCell className="text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {student.className}
                    </span>
                  </TableCell>

                  {/* Gender */}
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      student.gender === 'Male' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {student.gender}
                    </span>
                  </TableCell>

                  {/* Date of Birth */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {student.dateOfBirth}
                    </div>
                  </TableCell>

                  {/* Date of Admission */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {student.dateOfAdmission}
                    </div>
                  </TableCell>

                  {/* Monthly Fee */}
                  <TableCell className="text-center">
                    <span className="font-semibold text-gray-900">
                      Rs. {student.monthlyFee}
                    </span>
                  </TableCell>

                  {/* Contact */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 text-sm">
                      <Phone className="w-3.5 h-3.5" />
                      {student.contact}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors group">
                        <Edit2 className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors group">
                        <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 sm:px-6 py-4 border-t bg-gray-50">
          <button className="w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-white border border-gray-300 font-medium text-gray-700 transition-colors shadow-sm">
            Previous
          </button>
          <span className="text-sm font-medium text-gray-600">
            Page <span className="text-blue-600 font-semibold">1</span> of 12
          </span>
          <button className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentTable;