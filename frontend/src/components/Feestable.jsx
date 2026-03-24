import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Receipt } from "lucide-react";

const SkeletonRow = ({ cols }) => (
  <tr className="h-[57px]">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-gray-100 rounded-md animate-pulse" style={{ width: i === 0 ? "24px" : i === 1 ? "120px" : "70px" }} />
      </td>
    ))}
  </tr>
);

const EmptyRow = ({ cols }) => (
  <tr className="h-[57px] border-b border-gray-100">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} />
    ))}
  </tr>
);

// Smart pagination: 1 ... 4 5 6 ... 10
function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  } else if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  } else {
    return [1, "...", current - 1, current, current + 1, "...", total];
  }
}

const ROWS_PER_PAGE = 8;

export const StudentTable = ({
  students,
  onMarkPaid,
  onMarkUnpaid,
  onGenerateVoucher,
  loading = false,
}) => {
  const [page, setPage] = useState(1);

  const totalStudents = students?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalStudents / ROWS_PER_PAGE));

  const paginated = (students ?? []).slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const startEntry = totalStudents === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1;
  const endEntry = Math.min(page * ROWS_PER_PAGE, totalStudents);
  const emptyRowsCount = ROWS_PER_PAGE - paginated.length;
  const paginationRange = getPaginationRange(page, totalPages);

  return (
    <div className="flex flex-col">

      {/* Desktop */}
      <div className="hidden lg:block rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="border-b-2 border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="px-4 py-3.5 w-10">#</th>
              <th className="px-4 py-3.5 w-24">GR No</th>
              <th className="px-4 py-3.5">Student Name</th>
              <th className="px-4 py-3.5">Father Name</th>
              <th className="px-4 py-3.5 w-20">Class</th>
              <th className="px-4 py-3.5 w-20">Gender</th>
              <th className="px-4 py-3.5 w-24">Status</th>
              <th className="px-4 py-3.5 w-32">Next Due</th>
              <th className="px-4 py-3.5 w-52">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: ROWS_PER_PAGE }).map((_, i) => (
                <SkeletonRow key={i} cols={9} />
              ))
            ) : paginated.length === 0 ? (
              <>
                <tr className="h-[57px]">
                  <td colSpan={9} className="px-4 text-center text-gray-400 text-sm">
                    No students found.
                  </td>
                </tr>
                {Array.from({ length: ROWS_PER_PAGE - 1 }).map((_, i) => (
                  <EmptyRow key={i} cols={9} />
                ))}
              </>
            ) : (
              <>
                {paginated.map((student, idx) => (
                  <tr
                    key={student._id}
                    className="border-b border-gray-100 transition-colors hover:bg-blue-50/60 h-[57px]"
                  >
                    <td className="px-4 py-3 text-gray-300 text-xs font-bold">
                      {(page - 1) * ROWS_PER_PAGE + idx + 1}
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                      {student.GrNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-semibold">
                      {student.StudentName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{student.FatherName}</td>
                    <td className="px-4 py-3 text-gray-600">{student.Class}</td>
                    <td className="px-4 py-3 text-gray-600">{student.Gender}</td>
                    <td className="px-4 py-3">
                      <Badge className={student.feeStatus === "Paid" ? "bg-blue-700 text-white" : "bg-red-900 text-white"}>
                        {student.feeStatus || "Unpaid"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {student.nextDueDate ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100">
                          {new Date(student.nextDueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {student.feeStatus !== "Paid" ? (
                          <button onClick={() => onMarkPaid(student)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-green-200 transition-colors whitespace-nowrap">
                            <TrendingUp size={13} /> Mark Paid
                          </button>
                        ) : (
                          <button onClick={() => onMarkUnpaid(student)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                            <TrendingDown size={13} /> Edit Status
                          </button>
                        )}
                        <button onClick={() => onGenerateVoucher?.(student)} className="px-3 py-1.5 bg-violet-50 text-violet-700 border border-violet-200 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-violet-100 transition-colors whitespace-nowrap">
                          <Receipt size={13} /> Voucher
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: emptyRowsCount }).map((_, i) => (
                  <EmptyRow key={i} cols={9} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="border-b-2 border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="px-4 py-3.5 w-10">#</th>
              <th className="px-4 py-3.5">Student</th>
              <th className="px-4 py-3.5 w-24">Class</th>
              <th className="px-4 py-3.5 w-24">Status</th>
              <th className="px-4 py-3.5 w-28">Next Due</th>
              <th className="px-4 py-3.5 w-48">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: ROWS_PER_PAGE }).map((_, i) => (
                <SkeletonRow key={i} cols={6} />
              ))
            ) : paginated.length === 0 ? (
              <>
                <tr className="h-[57px]">
                  <td colSpan={6} className="px-4 text-center text-gray-400 text-sm">
                    No students found.
                  </td>
                </tr>
                {Array.from({ length: ROWS_PER_PAGE - 1 }).map((_, i) => (
                  <EmptyRow key={i} cols={6} />
                ))}
              </>
            ) : (
              <>
                {paginated.map((student, idx) => (
                  <tr key={student._id} className="border-b border-gray-100 transition-colors hover:bg-blue-50/60 h-[57px]">
                    <td className="px-4 py-3 text-gray-300 text-xs font-bold">
                      {(page - 1) * ROWS_PER_PAGE + idx + 1}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800">{student.StudentName}</p>
                      <p className="text-xs text-gray-400">GR {student.GrNumber} · {student.FatherName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-700">{student.Class}</p>
                      <p className="text-xs text-gray-400">{student.Gender}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={student.feeStatus === "Paid" ? "bg-blue-700 text-white" : "bg-red-900 text-white"}>
                        {student.feeStatus || "Unpaid"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {student.nextDueDate ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100">
                          {new Date(student.nextDueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {student.feeStatus !== "Paid" ? (
                          <button onClick={() => onMarkPaid(student)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-green-200 transition-colors whitespace-nowrap">
                            <TrendingUp size={13} /> Mark Paid
                          </button>
                        ) : (
                          <button onClick={() => onMarkUnpaid(student)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                            <TrendingDown size={13} /> Edit Status
                          </button>
                        )}
                        <button onClick={() => onGenerateVoucher?.(student)} className="px-3 py-1.5 bg-violet-50 text-violet-700 border border-violet-200 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-violet-100 transition-colors whitespace-nowrap">
                          <Receipt size={13} /> Voucher
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: emptyRowsCount }).map((_, i) => (
                  <EmptyRow key={i} cols={6} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3 px-1">
        {loading ? (
          Array.from({ length: ROWS_PER_PAGE }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
          ))
        ) : paginated.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">No students found.</div>
        ) : (
          paginated.map((student, idx) => (
            <div key={student._id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-300 w-5">
                    {(page - 1) * ROWS_PER_PAGE + idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{student.StudentName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">GR {student.GrNumber} · Class {student.Class}</p>
                  </div>
                </div>
                <Badge className={student.feeStatus === "Paid" ? "bg-blue-700 text-white" : "bg-red-900 text-white"}>
                  {student.feeStatus || "Unpaid"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-3">
                <div>
                  <span className="text-gray-400 text-xs">Father</span>
                  <p className="text-gray-700 font-medium truncate">{student.FatherName}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Gender</span>
                  <p className="text-gray-700 font-medium">{student.Gender}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Next Due</span>
                  <p className="text-orange-500 font-medium text-xs">
                    {student.nextDueDate ? new Date(student.nextDueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
                {student.feeStatus !== "Paid" ? (
                  <button onClick={() => onMarkPaid(student)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 text-xs font-semibold hover:bg-green-200 transition-colors">
                    <TrendingUp size={13} /> Mark Paid
                  </button>
                ) : (
                  <button onClick={() => onMarkUnpaid(student)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center gap-1 text-xs font-semibold hover:bg-blue-700 transition-colors">
                    <TrendingDown size={13} /> Edit Status
                  </button>
                )}
                <button onClick={() => onGenerateVoucher?.(student)} className="px-3 py-1.5 bg-violet-50 text-violet-700 border border-violet-200 rounded-lg flex items-center gap-1 text-xs font-semibold hover:bg-violet-100 transition-colors">
                  <Receipt size={13} /> Voucher
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 px-1">
        <p className="text-xs text-gray-400 font-medium">
          {totalStudents === 0 ? "No students" : `Showing ${startEntry}–${endEntry} of ${totalStudents} students`}
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          {paginationRange.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  p === page
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};