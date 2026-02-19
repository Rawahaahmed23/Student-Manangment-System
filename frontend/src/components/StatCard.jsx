import React from 'react';
import { TrendingUp } from "lucide-react";

const colorSchemes = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    iconBg: 'bg-blue-100'
  },

};

export default function StatCard({ title, value, trend, icon: Icon, color = 'blue' }) {
  const scheme = colorSchemes[color];
  
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">
            {title}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
            {value}
          </h2>
          {trend && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <div className={`flex items-center gap-1 ${scheme.bg} ${scheme.text} px-2.5 py-1.5 rounded-lg font-semibold`}>
                <TrendingUp size={14} />
                <span>{trend}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className={`${scheme.iconBg} rounded-xl p-3 sm:p-4`}>
          <Icon size={24} className={`sm:w-7 sm:h-7 ${scheme.text}`} />
        </div>
      </div>
    </div>
  );
}