import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import TableControl from './TableControl';

const Header = () => {
  return (
    <div className="bg-white border-b w-full">
      {/* Main Header */}
      <div className="px-25 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded"></div>
            <div>
              <div className="text-xs font-semibold text-gray-800">Logo</div>
     
            </div>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">Admin</span>
          <span className="text-blue-500">Pannel</span>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-3">
          
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm">User</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
     <TableControl />
      {/* Students Tab */}
     
    </div>
  );
};

export default Header;