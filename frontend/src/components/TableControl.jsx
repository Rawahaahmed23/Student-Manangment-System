import { Search, X, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TableControl({
  search,
  setSearch,
  classFilter,
  setClassFilter,
  genderFilter,
  setGenderFilter,
}) {
  const hasActiveFilters = classFilter || genderFilter;

  const GeneratePdf = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Student/download`, {
        method: "GET",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "students.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 my-6">
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
   <Select
  value={classFilter || "all"}
  onValueChange={(val) => setClassFilter(val === "all" ? "" : val)}
>
  <SelectTrigger className="w-36 rounded-xl border-slate-200 shadow-sm text-sm bg-white">
    <SelectValue placeholder="Class" />
  </SelectTrigger>

  <SelectContent position="popper" sideOffset={4} className="z-[9999] bg-white">
    <SelectItem value="all">All Classes</SelectItem>
    {Array.from({ length: 10 }, (_, i) => (i + 1).toString()).map((c) => (
      <SelectItem className="py-1.5 text-sm" key={c} value={c}>
        Class {c}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

        {/* Gender Select */}
        <Select value={genderFilter || "all"} onValueChange={(val) => setGenderFilter(val === "all" ? "" : val)}>
          <SelectTrigger className="w-36 rounded-xl border-slate-200 shadow-sm text-sm bg-white">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent className="z-[9999] bg-white">
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={() => { setClassFilter(""); setGenderFilter(""); }}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg px-2.5 py-1.5 transition-all"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}

        {/* Download Button */}
        <button
          onClick={GeneratePdf}
          className="flex items-center gap-1.5 text-xs text-white bg-slate-700 hover:bg-slate-800 rounded-xl px-3 py-2 shadow-sm transition-all ml-auto"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </button>

      </div>
    </div>
  );
}

export default TableControl;