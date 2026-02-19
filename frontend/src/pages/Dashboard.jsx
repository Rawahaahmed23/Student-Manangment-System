import React from "react";
import { Users, CheckCircle, XCircle, UserCheck } from "lucide-react";
import StatCard from "@/components/StatCard";
import FeeChart from "@/components/FeeChart";
import StudentOverview from "@/components/StudentOverview";
import RecentActivity from "@/components/RecentActivity";
import RecentStudents from "@/components/RecentStudent";

const students = [
  { id: 1, name: "Ali Khan", gender: "Boy", class: "Class 1", date: "2026-02-10" },
  { id: 2, name: "Sara Ahmed", gender: "Girl", class: "Class 2", date: "2026-02-12" },
  { id: 3, name: "Ahmed Raza", gender: "Boy", class: "Class 3", date: "2026-02-13" },
  { id: 4, name: "Fatima Noor", gender: "Girl", class: "Class 1", date: "2026-02-14" },
  { id: 5, name: "Hassan Ali", gender: "Boy", class: "Class 4", date: "2026-02-15" },
];

const stats = {
  totalStudents: 520,
  paidStudents: 420,
  notPaidStudents: 100,
  newAdmissions: 18,
};

const Dashboard = () => {
  return (
    <div className="min-h-2xl ">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
              School Admin Dashboard
            </h1>
          
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <StatCard 
            title="Total Students" 
            value={stats.totalStudents}
            icon={Users}
            trend="+12% from last month"
            color="blue"
          />
          <StatCard
            title="Paid Students"
            value={stats.paidStudents}
            icon={CheckCircle}
            trend="+15 this week"
            color="blue"
          />
          <StatCard
            title="Not Paid Students"
            value={stats.notPaidStudents}
            icon={XCircle}
            trend="-5 pending"
            color="blue"
          />
          <StatCard
            title="New Admissions"
            value={stats.newAdmissions}
            icon={UserCheck}
            trend="This month"
            color="blue"
          />
        </div>

        {/* Analytics Section */}
  <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-6 mb-8 sm:mb-10 w-full">
  {/* FeeChart */}
  <div className="lg:col-span-2 w-full h-full">
    <FeeChart className="w-full h-full" />
  </div>
  </div>




        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <StudentOverview students={students} />
          <RecentStudents students={students} />
          <div className="md:col-span-2 xl:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;