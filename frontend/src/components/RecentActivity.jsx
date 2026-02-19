import React from 'react';
import { Clock } from "lucide-react";

function RecentActivity() {
  const activities = [
    { text: "Ali Khan added to Class 1", icon: "➕", time: "2 min ago" },
    { text: "Sara Ahmed paid full fee", icon: "✓", time: "15 min ago" },
    { text: "Voucher generated for Ahmed Raza", icon: "🎟️", time: "1 hour ago" },
    { text: "Fatima Noor added to Class 1", icon: "➕", time: "2 hours ago" },
    { text: "Hassan Ali paid monthly fee", icon: "💳", time: "3 hours ago" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 h-full shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <Clock size={20} className="text-blue-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800">
          Recent Activity
        </h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base text-slate-700 font-medium">
                {activity.text}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;