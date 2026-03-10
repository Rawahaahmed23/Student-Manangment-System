import { Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";

import { MdAccountCircle } from "react-icons/md";




function TableControl({ search, setSearch }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Student Directory</h1>
        <p className="text-slate-400 text-sm">Manage and view all student records</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm w-full sm:w-48 lg:w-64">
          <Search className="w-4 h-4 shrink-0 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="bg-transparent outline-none text-slate-600 placeholder-slate-400 w-full text-sm"
          />
        </div>

        {/* Class Select */}
       {/* Class Select */}
<Select value={selectedClass} onValueChange={setSelectedClass}>
  <SelectTrigger className="w-36 rounded-xl border-slate-200 shadow-sm text-sm bg-white">
    <SelectValue placeholder=" Class" />
  </SelectTrigger>
  <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white !py-0">
    <SelectItem className="py-1.5 text-sm" value="all">All Classes</SelectItem>
    {["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6"].map((c) => (
      <SelectItem className="py-1.5 text-sm" key={c} value={c}>{c}</SelectItem>
    ))}
  </SelectContent>
</Select>

{/* Gender Select */}
<Select value={selectedGender} onValueChange={setSelectedGender}>
  <SelectTrigger className="w-36 rounded-xl border-slate-200 shadow-sm text-sm bg-white">
    <SelectValue placeholder=" Gender" />
  </SelectTrigger>
  <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white !py-0">
    <SelectItem className="py-1.5 text-sm" value="all">All Genders</SelectItem>
    <SelectItem className="py-1.5 text-sm" value="male"><BsGenderFemale /> Male</SelectItem>
    <SelectItem className="py-1.5 text-sm" value="female"><BsGenderMale /> Female</SelectItem>
  </SelectContent>
</Select>

        {/* Clear Filters */}
        {((selectedClass && selectedClass !== "all") || (selectedGender && selectedGender !== "all")) && (
          <button
            onClick={() => { setSelectedClass(""); setSelectedGender(""); }}
            className="text-xs text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg px-2.5 py-1.5 transition-all"
          >
            Clear ×
          </button>
        )}

      </div>
    </div>
  );
}

export default TableControl;