import React from "react";
import { Users, CheckCircle, XCircle, UserCheck } from "lucide-react";
import StatCard from "@/components/StatCard";
import FeeChart from "@/components/FeeChart";
import StudentOverview from "@/components/StudentOverview";
import RecentActivity from "@/components/RecentActivity";
import RecentStudents from "@/components/RecentStudent";
import { useStudent } from "@/Store/StudentData";
import { useStudentFilters } from "@/Hooks/filterStudent";

const Dashboard = () => {
  const { students } = useStudent();
  const { filteredStudents } = useStudentFilters(students);

  const totalStudents = students?.length ?? 0;
  const paidStudents = students?.filter((s) => s.feeStatus === "Paid").length ?? 0;
  const unpaidStudents = students?.filter((s) => s.feeStatus !== "Paid").length ?? 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newAdmissions = students?.filter((s) => {
    const d = new Date(s.DateOfAdmission);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length ?? 0;

  return (
    <div className="min-h-2xl">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">

        <div className="mb-8 sm:mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
              School Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={Users}
            trend="+12% from last month"
            color="blue"
          />
          <StatCard
            title="Paid Students"
            value={paidStudents}
            icon={CheckCircle}
            trend="+15 this week"
            color="blue"
          />
          <StatCard
            title="Unpaid Students"
            value={unpaidStudents}
            icon={XCircle}
            trend="Pending fee"
            color="blue"
          />
          <StatCard
            title="New Admissions"
            value={newAdmissions}
            icon={UserCheck}
            trend="This month"
            color="blue"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-6 mb-8 sm:mb-10 w-full">
          <div className="w-full h-full">
            <FeeChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <StudentOverview students={students} filteredStudents={filteredStudents} />
          <RecentStudents students={students ?? []} />
          <div className="md:col-span-2 xl:col-span-1">
            <RecentActivity />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;