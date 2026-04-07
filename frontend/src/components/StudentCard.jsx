import { useState } from "react";
import { Edit2, Trash2, Calendar, BadgeCheck, Clock, Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "@/Store/StudentData";
import DeleteConfirmPopup from "@/components/Popup";

const GENDER_STYLES = {
  Male: "bg-sky-50 text-sky-600 border border-sky-100",
  Female: "bg-pink-50 text-pink-600 border border-pink-100",
};

function Avatar({ name, profileImage }) {
  const initials = name?.charAt(0)?.toUpperCase() ?? "?";

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={name}
        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm"
      />
    );
  }

  return (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-500 text-base shadow-sm ring-2 ring-white">
      {initials}
    </div>
  );
}

function InfoBlock({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</p>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
}

function StudentCard({ student }) {
  const { deleteStudent } = useStudent();
  const navigate = useNavigate();

  const [popup, setPopup] = useState({
    open: false,
    studentId: null,
    studentName: "",
  });

  const handleDeleteClick = () =>
    setPopup({ open: true, studentId: student._id, studentName: student.StudentName });

  const handleConfirmDelete = () => {
    deleteStudent(popup.studentId);
    setPopup({ open: false, studentId: null, studentName: "" });
  };

  const handleCancelDelete = () =>
    setPopup({ open: false, studentId: null, studentName: "" });

  const isPaid = student.FeeStatus === "Paid";

  return (
    <>
      <DeleteConfirmPopup
        isOpen={popup.open}
        studentName={popup.studentName}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <Avatar
              name={student.StudentName}
              profileImage={student.profileImage?.url}
            />
            <div>
              <p className="font-semibold text-slate-800 text-sm leading-tight">
                {student.StudentName}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                GR# <span className="font-mono">{student.GrNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs font-bold bg-slate-800 text-white px-2.5 py-1 rounded-full">
              Class {student.Class}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${GENDER_STYLES[student.Gender]}`}>
              {student.Gender}
            </span>
          </div>
        </div>

        {/* ── Details Grid ── */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-3">
          <InfoBlock label="Father">
            <span className="text-slate-700">{student.FatherName}</span>
          </InfoBlock>

          <InfoBlock label="Monthly Fee">
            <span className="font-semibold text-slate-800">Rs. {student.MonthlyFee}</span>
          </InfoBlock>

          <InfoBlock label="Date of Birth">
            <span className="flex items-center gap-1 text-slate-600">
              <Calendar className="w-3 h-3 text-slate-400" />
              {new Date(student.DateOfBirth).toLocaleDateString()}
            </span>
          </InfoBlock>

          <InfoBlock label="Admission">
            <span className="flex items-center gap-1 text-slate-600">
              <Calendar className="w-3 h-3 text-slate-400" />
              {new Date(student.DateOfAdmission).toLocaleDateString()}
            </span>
          </InfoBlock>

          {/* ── NEW: Phone ── */}
          <InfoBlock label="Phone">
            {student.PhoneNumber ? (
              <a
                href={`tel:${student.PhoneNumber}`}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-3 h-3" />
                {student.PhoneNumber}
              </a>
            ) : (
              <span className="text-slate-300 text-xs">—</span>
            )}
          </InfoBlock>

          {/* ── NEW: WhatsApp ── */}
          <InfoBlock label="WhatsApp">
            {student.WhatsAppNumber ? (
              <a
                href={`https://wa.me/${student.WhatsAppNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-green-500 hover:text-green-600 transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                {student.WhatsAppNumber}
              </a>
            ) : (
              <span className="text-slate-300 text-xs">—</span>
            )}
          </InfoBlock>
        </div>

        {/* ── Fee Status Bar ── */}
        <div className={`mx-4 mb-3 px-3 py-2 rounded-xl flex items-center gap-2 ${isPaid ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"}`}>
          {isPaid
            ? <BadgeCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />
            : <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
          }
          <span className={`text-xs font-medium ${isPaid ? "text-green-600" : "text-red-500"}`}>
            Fee {student.FeeStatus}
          </span>
        </div>

        {/* ── Actions ── */}
        <div className="grid grid-cols-2 border-t border-slate-50">
          <button
            onClick={() => navigate(`/edit-student/${student._id}`)}
            className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors border-r border-slate-50"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </button>

          <button
            onClick={handleDeleteClick}
            className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>

      </div>
    </>
  );
}

export default StudentCard;