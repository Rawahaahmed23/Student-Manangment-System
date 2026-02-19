import { useState } from "react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const initialStudents = [
  { id: 1, name: "Ahmed Ali",   roll: "001", cls: "10-A", month: "January",  status: "paid"   },
  { id: 2, name: "Sara Khan",   roll: "002", cls: "10-A", month: "January",  status: "unpaid" },
  { id: 3, name: "Bilal Ahmed", roll: "003", cls: "9-B",  month: "February", status: "paid"   },
  { id: 4, name: "Fatima Noor", roll: "004", cls: "9-B",  month: "February", status: "unpaid" },
];

export default function FeesTracker() {
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState({ name: "", roll: "", cls: "", month: "", status: "unpaid" });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addStudent = () => {
    if (!form.name.trim() || !form.roll.trim()) {
      alert("Name and Roll No. are required.");
      return;
    }
    setStudents([...students, { id: Date.now(), ...form }]);
    setForm({ name: "", roll: "", cls: "", month: "", status: "unpaid" });
  };

  const toggleStatus = (id) => {
    setStudents(students.map((s) =>
      s.id === id ? { ...s, status: s.status === "paid" ? "unpaid" : "paid" } : s
    ));
  };

  const removeStudent = (id) => {
    if (window.confirm("Remove this student?"))
      setStudents(students.filter((s) => s.id !== id));
  };

  const filtered = students.filter((s) => {
    const matchFilter = filter === "all" || s.status === filter;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const paid   = students.filter((s) => s.status === "paid").length;
  const unpaid = students.filter((s) => s.status === "unpaid").length;

  const inputCls = "border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 w-full bg-white text-gray-700 transition";
  const selectCls = "border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 w-full bg-white text-gray-700 transition";

  // Table cell styles with borders
  const thCls = "px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400 border border-gray-200";
  const tdCls = "px-5 py-3.5 border border-gray-200";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10 font-sans">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-10 rounded-full bg-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fees Tracker</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and track student fee payments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Students", value: students.length, color: "text-indigo-600",  bg: "bg-indigo-50",  border: "border-indigo-100" },
          { label: "Paid",           value: paid,            color: "text-green-600",   bg: "bg-green-50",   border: "border-green-100"  },
          { label: "Unpaid",         value: unpaid,          color: "text-red-500",     bg: "bg-red-50",     border: "border-red-100"    },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl px-6 py-4`}>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-50 bg-gray-50">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Add New Student</span>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Student Name"
              className={inputCls + " xl:col-span-1"}
            />
            <input
              name="roll"
              value={form.roll}
              onChange={handleChange}
              placeholder="Roll No."
              className={inputCls}
            />
            <input
              name="cls"
              value={form.cls}
              onChange={handleChange}
              placeholder="Class"
              className={inputCls}
            />
            <select name="month" value={form.month} onChange={handleChange} className={selectCls}>
              <option value="">Select Month</option>
              {MONTHS.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select name="status" value={form.status} onChange={handleChange} className={selectCls}>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
            <button
              onClick={addStudent}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition w-full"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          placeholder="Search by name or roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 bg-white text-gray-700 w-full sm:w-72 transition"
        />
        <div className="flex gap-2">
          {["all", "paid", "unpaid"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition capitalize
                ${filter === f
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr>
                {["#","Student Name","Roll No.","Class","Month","Status","Action",""].map((h, i) => (
                  <th key={i} className={thCls}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-14 text-gray-300 text-sm border border-gray-200">
                    No students found.
                  </td>
                </tr>
              ) : (
                filtered.map((s, i) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition">
                    <td className={`${tdCls} text-gray-300 w-8`}>{i + 1}</td>
                    <td className={`${tdCls} font-semibold text-gray-800`}>{s.name}</td>
                    <td className={`${tdCls} text-gray-400`}>{s.roll}</td>
                    <td className={`${tdCls} text-gray-400`}>{s.cls || "—"}</td>
                    <td className={`${tdCls} text-gray-400`}>{s.month || "—"}</td>
                    <td className={tdCls}>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide
                        ${s.status === "paid"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                        }`}>
                        {s.status === "paid" ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className={tdCls}>
                      <button
                        onClick={() => toggleStatus(s.id)}
                        className="border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                      >
                        {s.status === "paid" ? "Mark Unpaid" : "Mark Paid"}
                      </button>
                    </td>
                    <td className={tdCls}>
                      <button
                        onClick={() => removeStudent(s.id)}
                        className="text-gray-300 hover:text-red-400 text-xs font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="text-center py-14 text-gray-300 text-sm">No students found.</div>
          ) : (
            filtered.map((s, i) => (
              <div key={s.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{s.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Roll: {s.roll} &nbsp;|&nbsp; Class: {s.cls || "—"}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Month: {s.month || "—"}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold
                    ${s.status === "paid" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                    {s.status === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleStatus(s.id)}
                    className="flex-1 border border-gray-200 text-gray-500 text-xs font-semibold py-1.5 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition"
                  >
                    {s.status === "paid" ? "Mark Unpaid" : "Mark Paid"}
                  </button>
                  <button
                    onClick={() => removeStudent(s.id)}
                    className="text-gray-300 hover:text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="flex flex-wrap gap-5 px-5 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
          <span>Total: <span className="font-bold text-gray-600">{students.length}</span></span>
          <span>Paid: <span className="font-bold text-green-600">{paid}</span></span>
          <span>Unpaid: <span className="font-bold text-red-500">{unpaid}</span></span>
        </div>
      </div>

    </div>
  );
}