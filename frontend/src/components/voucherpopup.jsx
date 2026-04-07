import { useState, useRef, useEffect } from "react";
import { X, FileText, ChevronUp, ChevronDown, Check } from "lucide-react";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

const MONTHS = [
  { value: 1,  label: "January" },  { value: 2,  label: "February" },
  { value: 3,  label: "March" },    { value: 4,  label: "April" },
  { value: 5,  label: "May" },      { value: 6,  label: "June" },
  { value: 7,  label: "July" },     { value: 8,  label: "August" },
  { value: 9,  label: "September" },{ value: 10, label: "October" },
  { value: 11, label: "November" }, { value: 12, label: "December" },
];

function PickerDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      const selected = listRef.current.querySelector("[data-selected='true']");
      if (selected) selected.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="relative" ref={ref}>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 font-medium bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
      >
        <span>{selectedLabel}</span>
        {open
          ? <ChevronDown size={16} className="text-gray-400" />
          : <ChevronUp size={16} className="text-gray-400" />}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-1 z-50">
          <div
            ref={listRef}
            className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto"
            style={{ maxHeight: "180px" }}
          >
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                data-selected={o.value === value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors
                  ${o.value === value
                    ? "bg-slate-100 text-slate-800"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <span>{o.label}</span>
                {o.value === value && <Check size={14} className="text-slate-600" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Voucherpopup = ({ title, description, confirmLabel = "Generate", onConfirm, onCancel }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear]   = useState(currentYear);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white w-full max-w-sm mx-4 rounded-2xl shadow-2xl p-5 sm:p-6 relative overflow-visible">

        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-100 mx-auto mb-4">
          <FileText size={22} className="text-slate-700" />
        </div>

        <h3 className="text-center text-gray-900 font-bold text-base sm:text-lg mb-1">
          {title ?? "Select Month & Year"}
        </h3>
        {description && (
          <p className="text-center text-gray-500 text-sm mb-5 px-2">{description}</p>
        )}

        <div className="flex gap-3 mb-5 mt-4">
          <div className="flex-1">
            <PickerDropdown
              label="Month"
              value={selectedMonth}
              options={MONTHS}
              onChange={setSelectedMonth}
            />
          </div>
          <div className="flex-1">
            <PickerDropdown
              label="Year"
              value={selectedYear}
              options={yearOptions.map((y) => ({ value: y, label: String(y) }))}
              onChange={setSelectedYear}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedMonth, selectedYear)}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 active:bg-slate-900 transition-colors shadow-sm"
          >
            {confirmLabel}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Voucherpopup;