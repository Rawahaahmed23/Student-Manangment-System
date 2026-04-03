
import { useState, useEffect } from "react";
import { FileText, Download, Calendar, BadgeCheck, Clock, Loader2 } from "lucide-react";
import { SearchFilter } from "../components/SearchFilter";
import { useStudent } from "@/Store/StudentData";


const BASE_URL = "https://student-manangment-system.onrender.com";
const ITEMS_PER_PAGE = 8;





const downloadSingleVoucher = async (studentId, studentName) => {
  try {
    const res = await fetch(`${BASE_URL}/feesVoucher/voucher/${studentId}`);
    if (!res.ok) throw new Error("Failed");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Voucher_${studentName.replace(/\s+/g, "_")}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Single voucher error:", err);
    alert("Failed to generate voucher. Please try again.");
  }
};






const downloadAllVouchers = async (setLoadingAll) => {
  try {
    setLoadingAll(true);
    const res = await fetch(`${BASE_URL}/feesVoucher/voucher/all`);
    if (!res.ok) throw new Error("Failed");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FeeVouchers_${new Date().getFullYear()}.zip`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("All vouchers error:", err);
    alert("Failed to generate ZIP. Please try again.");
  } finally {
    setLoadingAll(false);
  }
  
  

}


const CLASS_OPTIONS = [
  { value: "", label: "All Classes" },
  { value: "Reception", label: "Reception" },
  { value: "Junior", label: "Junior" },
  { value: "Senior", label: "Senior" },
  ...[1,2,3,4,5,6,7,8].map(n => ({ value: `Class ${n}`, label: `Class ${n}` })),
  { value: "Hifz", label: "Hifz" },
  { value: "Nazra", label: "Nazra" },
];


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


function VoucherCard({ student }) {
  const [loadingSingle, setLoadingSingle] = useState(false);
  const isPaid = student.feeStatus === "Paid";
  const isMale = student.Gender === "Male";

  const handleSingle = async () => {
    setLoadingSingle(true);
    await downloadSingleVoucher(student._id, student.StudentName);
    setLoadingSingle(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <Avatar name={student.StudentName} profileImage={student.profileImage?.url} />
          <div>
            <p className="font-semibold text-slate-800 text-sm leading-tight">{student.StudentName}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              GR# <span className="font-mono">{student.GrNumber}</span>
            </p>
          </div>
        </div>
        <span className="text-xs font-bold bg-slate-800 text-white px-2.5 py-1 rounded-full">
          Class {student.Class}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Father</p>
          <p className="text-sm text-slate-700">{student.FatherName}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Monthly Fee</p>
          <p className="text-sm font-semibold text-slate-800">Rs. {student.MonthlyFee}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Admission</p>
          <span className="flex items-center gap-1 text-sm text-slate-600">
            <Calendar className="w-3 h-3 text-slate-400" />
            {new Date(student.DateOfAdmission).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Fee Status</p>
          <div className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-lg ${isPaid ? "bg-green-50" : "bg-red-50"}`}>
            {isPaid
              ? <BadgeCheck className="w-3 h-3 text-green-500" />
              : <Clock className="w-3 h-3 text-red-400" />}
            <span className={`text-xs font-medium ${isPaid ? "text-green-600" : "text-red-500"}`}>
              {student.feeStatus}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Gender</p>
          <span className={`text-xs font-medium w-fit px-2 py-0.5 rounded-lg ${
            isMale ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-500"
          }`}>
            {student.Gender}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="border-t border-slate-50 px-4 py-3">
        <button
          onClick={handleSingle}
          disabled={loadingSingle}
          className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all text-gray-700 font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingSingle
            ? <Loader2 size={14} className="animate-spin" />
            : <FileText size={14} />}
          {loadingSingle ? "Generating..." : "Generate voucher"}
        </button>
      </div>

    </div>
  );
}


export default function GenerateFeesVoucher() {
  const { students, loading } = useStudent();

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingSingleId, setLoadingSingleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, classFilter, genderFilter]);

  const filtered = students.filter((s) => {
    const matchSearch =
      s.StudentName?.toLowerCase().includes(search.toLowerCase()) ||
      s.FatherName?.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter ? s.Class?.toString() === classFilter : true;
    const matchGender = genderFilter ? s.Gender === genderFilter : true;
    return matchSearch && matchClass && matchGender;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSingleRow = async (student) => {
    setLoadingSingleId(student._id);
    await downloadSingleVoucher(student._id, student.StudentName);
    setLoadingSingleId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pt-16">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Generate fees voucher</h1>
          <p className="text-sm text-gray-400 mt-1">Select a student to generate their fees voucher</p>
        </div>
        <button
          onClick={() => downloadAllVouchers(setLoadingAll)}
          disabled={loadingAll}
          className="flex items-center justify-center gap-2 text-sm px-4 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all text-gray-700 font-medium shadow-sm w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingAll
            ? <Loader2 size={15} className="animate-spin" />
            : <Download size={15} />}
          {loadingAll ? "Generating ZIP..." : "Generate all vouchers"}
        </button>
      </div>

   
      <SearchFilter
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search by name..."
        filters={[
          {
            value: classFilter,
            onChange: setClassFilter,
            placeholder: "All Classes",
          options: CLASS_OPTIONS,
          },
          {
            value: genderFilter,
            onChange: setGenderFilter,
            placeholder: "All Genders",
            options: [
              { value: "", label: "All Genders" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ],
          },
        ]}
      />

   
      {loading ? (
        <div className="py-20 text-center text-sm text-gray-400">Loading students...</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-sm text-gray-400">No students found</div>
      ) : (
        <>
          {/* Mobile + Tablet: Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {paginated.map((s) => (
              <VoucherCard key={s._id} student={s} />
            ))}
          </div>

        
          <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-[70px_1fr_1fr_100px_110px_170px] px-6 py-3 bg-gray-50 border-b border-gray-200">
              {["GR#", "Student Name", "Father Name", "Class", "Gender", "Action"].map((h) => (
                <span key={h} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {h}
                </span>
              ))}
            </div>

            {paginated.map((s, i) => (
              <div
                key={s._id}
                className={`grid grid-cols-[70px_1fr_1fr_100px_110px_170px] px-6 py-4 items-center hover:bg-gray-50 transition-colors ${
                  i < paginated.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-lg w-fit">
                  {s.GrNumber}
                </span>

                <div className="flex items-center gap-3">
                  <Avatar name={s.StudentName} profileImage={s.profileImage?.url} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{s.StudentName}</p>
                    <p className="text-xs text-gray-400">Student</p>
                  </div>
                </div>

                <span className="text-sm text-gray-700">{s.FatherName}</span>

                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg w-fit">
                  Class {s.Class}
                </span>

                <span className={`text-xs font-medium px-3 py-1 rounded-lg w-fit ${
                  s.Gender === "Male"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-pink-50 text-pink-500"
                }`}>
                  {s.Gender}
                </span>

                <button
                  onClick={() => handleSingleRow(s)}
                  disabled={loadingSingleId === s._id}
                  className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all text-gray-700 font-medium w-fit shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingSingleId === s._id
                    ? <Loader2 size={13} className="animate-spin" />
                    : <FileText size={13} />}
                  {loadingSingleId === s._id ? "Generating..." : "Generate voucher"}
                </button>
              </div>
            ))}
          </div>

     
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

    
      {!loading && (
        <p className="text-xs text-gray-400 text-center mt-4">
          Showing {paginated.length} of {filtered.length} students
        </p>
      )}

    </div>
  );
}