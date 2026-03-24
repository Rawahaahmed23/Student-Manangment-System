import React, { useMemo } from 'react';
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStudent } from '@/Store/StudentData';
import { useStudentFilters } from '@/Hooks/filterStudent';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function FeeChart() {
  const { students } = useStudent();

  const { filteredStudents } = useStudentFilters(students);

  const data = useMemo(() => {
    return MONTHS.map((month, index) => {
      const monthStudents = filteredStudents.filter((s) => {
        const d = new Date(s.DateOfAdmission);
        return d.getMonth() === index;
      });

      return {
        month,
        paid: monthStudents.filter((s) => s.feeStatus === 'Paid').length,
        unpaid: monthStudents.filter((s) => s.feeStatus !== 'Paid').length,
      };
    });
  }, [filteredStudents]);

  const totalPaid = filteredStudents.filter((s) => s.feeStatus === 'Paid').length;
  const totalUnpaid = filteredStudents.filter((s) => s.feeStatus !== 'Paid').length;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl w-full p-6 sm:p-8 h-full shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">Fee Status</h3>
          <p className="text-xs text-slate-400 mt-0.5">Based on filtered students</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs sm:text-sm text-slate-600">
                Paid <span className="font-semibold text-slate-800">({totalPaid})</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <span className="text-xs sm:text-sm text-slate-600">
                Unpaid <span className="font-semibold text-slate-800">({totalUnpaid})</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <TrendingUp size={20} className="text-emerald-600" />
        </div>
      </div>

      <div className="w-full h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02}/>
              </linearGradient>
              <linearGradient id="colorUnpaid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb7185" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#fb7185" stopOpacity={0.02}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '12px',
              }}
              formatter={(value, name) => [
                `${value} students`,
                name === 'paid' ? 'Paid' : 'Unpaid'
              ]}
            />
            <Area
              type="monotone"
              dataKey="paid"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#colorPaid)"
              name="paid"
            />
            <Area
              type="monotone"
              dataKey="unpaid"
              stroke="#fb7185"
              strokeWidth={2.5}
              fill="url(#colorUnpaid)"
              name="unpaid"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FeeChart;