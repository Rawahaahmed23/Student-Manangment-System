import React, { useState, useEffect, useRef } from "react";
import { X, CalendarCheck2, ChevronDown, ChevronUp, BadgeDollarSign, Check } from "lucide-react";

export const MonthsModal = ({
  isOpen,
  title,
  student,
  mode,
  onConfirm,
  onClose,
  onSwitchToPaid,
  isLoading = false,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [confirming, setConfirming] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const monthListRef = useRef(null);
  const yearListRef = useRef(null);

  const monthOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const years = Array.from({ length: 6 }, (_, i) => String(2023 + i));

  useEffect(() => {
    if (isOpen) {
      setSelectedMonth("");
      setSelectedYear("2025");
    }
  }, [isOpen, student]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (monthRef.current && !monthRef.current.contains(e.target)) setMonthOpen(false);
      if (yearRef.current && !yearRef.current.contains(e.target)) setYearOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Scroll selected into view
  useEffect(() => {
    if (monthOpen && monthListRef.current) {
      const sel = monthListRef.current.querySelector("[data-selected='true']");
      if (sel) sel.scrollIntoView({ block: "nearest" });
    }
  }, [monthOpen]);

  useEffect(() => {
    if (yearOpen && yearListRef.current) {
      const sel = yearListRef.current.querySelector("[data-selected='true']");
      if (sel) sel.scrollIntoView({ block: "nearest" });
    }
  }, [yearOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!selectedMonth) return;
    setConfirming(true);
    await onConfirm(selectedMonth, selectedYear);
    setConfirming(false);
    setSelectedMonth("");
  };

  const isPay = mode === "paid";
  const busy = confirming || isLoading;
  const showMarkPaidButton = !isPay;

  const DropdownButton = ({ value, placeholder, isOpen, onClick, highlight }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between border-2 rounded-xl px-3 py-2.5 text-sm font-medium bg-gray-50 hover:bg-gray-100 focus:outline-none transition-colors
        ${highlight ? "border-blue-400 text-gray-800" : "border-gray-200 text-gray-400"}`}
    >
      <span>{value || placeholder}</span>
      {isOpen
        ? <ChevronDown size={14} className="text-gray-400" />
        : <ChevronUp size={14} className="text-gray-400" />}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-visible">

        <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-2xl" />

        <div className="p-6">

          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <CalendarCheck2 size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">{title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isPay ? "Mark month as paid" : "Mark month as unpaid"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-gray-500 transition-colors rounded-lg hover:bg-gray-100 p-1.5 -mt-1 -mr-1"
            >
              <X size={16} />
            </button>
          </div>

          {/* Dropdowns */}
          <div className="flex gap-3 mb-5">

            {/* Month Dropdown */}
            <div className="flex-1 space-y-1.5 relative" ref={monthRef}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Month
              </label>
              <DropdownButton
                value={selectedMonth}
                placeholder="— Select —"
                isOpen={monthOpen}
                highlight={!!selectedMonth}
                onClick={() => { setMonthOpen(o => !o); setYearOpen(false); }}
              />
              {monthOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-1 z-50">
                  <div
                    ref={monthListRef}
                    className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto"
                    style={{ maxHeight: "200px" }}
                  >
                    {monthOrder.map((m) => (
                      <button
                        key={m}
                        type="button"
                        data-selected={m === selectedMonth}
                        onClick={() => { setSelectedMonth(m); setMonthOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors
                          ${m === selectedMonth
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        <span>{m}</span>
                        {m === selectedMonth && <Check size={14} className="text-blue-500" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Year Dropdown */}
            <div className="w-28 space-y-1.5 relative" ref={yearRef}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Year
              </label>
              <DropdownButton
                value={selectedYear}
                isOpen={yearOpen}
                highlight={true}
                onClick={() => { setYearOpen(o => !o); setMonthOpen(false); }}
              />
              {yearOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-1 z-50">
                  <div
                    ref={yearListRef}
                    className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto"
                    style={{ maxHeight: "200px" }}
                  >
                    {years.map((y) => (
                      <button
                        key={y}
                        type="button"
                        data-selected={y === selectedYear}
                        onClick={() => { setSelectedYear(y); setYearOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors
                          ${y === selectedYear
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        <span>{y}</span>
                        {y === selectedYear && <Check size={14} className="text-blue-500" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Selected preview */}
          {selectedMonth && (
            <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <CalendarCheck2 size={13} />
              {selectedMonth} {selectedYear} — marked as {isPay ? "paid ✓" : "unpaid ✗"}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <button
                onClick={onClose}
                disabled={busy}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={busy || !selectedMonth}
                className="flex-1 py-2.5 rounded-xl text-sm text-white font-semibold transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-95 bg-blue-600 hover:bg-blue-700"
              >
                {confirming ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>

            {showMarkPaidButton && (
              <button
                onClick={onSwitchToPaid}
                disabled={busy}
                className="w-full py-2.5 rounded-xl text-sm text-white font-semibold transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-95 bg-emerald-500 hover:bg-emerald-600"
              >
                <BadgeDollarSign size={15} />
                Mark as Paid
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};