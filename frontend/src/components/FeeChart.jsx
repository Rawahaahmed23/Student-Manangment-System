import React from 'react';
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

function FeeChart() {
  const data = [
    { month: 'Jan', income: 450, expense: 320 },
    { month: 'Feb', income: 520, expense: 380 },
    { month: 'Mar', income: 480, expense: 350 },
    { month: 'Apr', income: 600, expense: 420 },
    { month: 'May', income: 550, expense: 390 },
    { month: 'Jun', income: 680, expense: 460 },
    { month: 'Jul', income: 720, expense: 500 },
    { month: 'Aug', income: 650, expense: 470 },
    { month: 'Sep', income: 750, expense: 520 },
    { month: 'Oct', income: 800, expense: 580 },
    { month: 'Nov', income: 720, expense: 550 },
    { month: 'Dec', income: 850, expense: 600 }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl w-full p-6 sm:p-8 h-full shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">
            Earnings
          </h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs sm:text-sm text-slate-600">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs sm:text-sm text-slate-600">Expense</span>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <TrendingUp size={20} className="text-blue-600" />
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}K`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => `₨${value}K`}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke="#3b82f6" 
              strokeWidth={2.5}
              fill="url(#colorIncome)" 
              name="Income"
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              stroke="#a855f7" 
              strokeWidth={2.5}
              fill="url(#colorExpense)" 
              name="Expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FeeChart;