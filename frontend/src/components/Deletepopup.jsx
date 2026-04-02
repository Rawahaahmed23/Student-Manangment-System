import { useState, useRef, useEffect } from "react";
import { X, AlertTriangle, ChevronUp, ChevronDown, Check } from "lucide-react";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

const DeleteConfirmPopup = ({ student, onConfirm, onCancel }) => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (dropdownOpen && listRef.current) {
      const selected = listRef.current.querySelector("[data-selected='true']");
      if (selected) selected.scrollIntoView({ block: "nearest" });
    }
  }, [dropdownOpen]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white w-full max-w-sm mx-4 rounded-2xl shadow-2xl p-5 sm:p-6 relative overflow-visible">

        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-100 mx-auto mb-4">
          <AlertTriangle size={22} className="text-red-500" />
        </div>

        {/* Title */}
        <h3 className="text-center text-gray-900 font-bold text-base sm:text-lg mb-1">
          Delete Fee Record
        </h3>
        <p className="text-center text-gray-500 text-sm mb-5 px-2">
          Select the year for{" "}
          <span className="font-semibold text-gray-800">{student?.StudentName}</span>
          's fee record to be deleted.
        </p>

        {/* Custom Year Dropdown */}
        <div className="mb-5 relative" ref={dropdownRef}>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Select Year
          </label>

          {/* Trigger */}
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 font-medium bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 transition"
          >
            <span>{selectedYear}</span>
            {dropdownOpen
              ? <ChevronDown size={16} className="text-gray-400" />
              : <ChevronUp size={16} className="text-gray-400" />}
          </button>

          {/* List — opens UPWARD */}
          {dropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 z-50">
              <div
                ref={listRef}
                className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto"
                style={{ maxHeight: "200px" }}
              >
                {yearOptions.map((y) => (
                  <button
                    key={y}
                    type="button"
                    data-selected={y === selectedYear}
                    onClick={() => {
                      setSelectedYear(y);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors
                      ${y === selectedYear
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span>{y}</span>
                    {y === selectedYear && <Check size={14} className="text-red-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(student?._id, selectedYear)}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:bg-red-700 transition-colors shadow-sm"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmPopup;