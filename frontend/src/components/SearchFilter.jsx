"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";



export const SearchFilter = ({
  search,
  setSearch,
  classFilter,
  setClassFilter,
  genderFilter,
  setGenderFilter,
}) => {
  const classes = ["8", "9", "10", "11", "12"];
  const genders = ["Male", "Female"];

  const hasActiveFilters = search || classFilter || genderFilter;

  const clearFilters = () => {
    setSearch("");
    setClassFilter("");
    setGenderFilter("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative md:col-span-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>

        {/* Class Filter */}
        <div className="relative">
          <Filter
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                Class {cls}
              </option>
            ))}
          </select>
        </div>

   
        <div className="relative">
          <Filter
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
          >
            <option value="">All Genders</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
      </div>


      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-semibold"
          >
            <X size={16} />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
