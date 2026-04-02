"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Filter, X, ChevronUp, ChevronDown, Check } from "lucide-react";
// Yeh array bana lo upar component se bahar

const CustomDropdown = ({ icon: Icon, value, onChange, options, placeholder }) => {
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
      const sel = listRef.current.querySelector("[data-selected='true']");
      if (sel) sel.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label || "";
  

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 pl-4 pr-3 py-3 border-2 rounded-xl bg-white transition-all focus:outline-none
          ${value ? "border-blue-400 text-gray-800" : "border-gray-200 text-gray-400"}`}
      >
        <Icon size={18} className="text-gray-400 shrink-0" />
        <span className="flex-1 text-left text-sm font-medium truncate">
          {selectedLabel || placeholder}
        </span>
        {open
          ? <ChevronUp size={15} className="text-gray-400 shrink-0" />
          : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50">
          <div
            ref={listRef}
            className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto"
            style={{ maxHeight: "200px" }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                data-selected={opt.value === value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors
                  ${opt.value === value
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span>{opt.label}</span>
                {opt.value === value && <Check size={14} className="text-blue-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Reusable version ────────────────────────────────────────────────────────
export const SearchFilter = ({
  search,
  setSearch,
  filters = [],        // [ { value, onChange, options, placeholder } ]
  searchPlaceholder = "Search...",
}) => {
  const hasActiveFilters = search || filters.some((f) => f.value);

  const clearFilters = () => {
    setSearch("");
    filters.forEach((f) => f.onChange(""));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="relative md:col-span-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>

        {filters.map((f, i) => (
          <CustomDropdown
            key={i}
            icon={Filter}
            value={f.value}
            onChange={f.onChange}
            options={f.options}
            placeholder={f.placeholder}
          />
        ))}

      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-semibold"
          >
            <X size={16} /> Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};