import React, { useState } from 'react';
import { Search, ChevronDown, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue ,SelectGroup,SelectLabel} from '@/components/ui/select';


const TableControl = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Controls Section */}
      <div className="px-20 py-4 border-b space-y-4">
        {/* Search and Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search..." 
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
           
            <Button variant="outline" size="sm">
              Download as pdf 
            </Button>
        
          </div>
        </div>

        {/* {Gender} */}
        <div className="flex items-end justify-end">
         

          <div className="flex items-center space-x-2">
    <Select>
  <SelectTrigger className="w-32 h-8 text-xs bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-semibold text-gray-700">
    <SelectValue placeholder="Gender" />
  </SelectTrigger>
  <SelectContent 
    position="popper" 
    sideOffset={5}
    className="bg-white border-2 border-indigo-100 rounded-lg shadow-lg z-50"
  >
    <div className="max-h-[150px] overflow-y-auto">
      <SelectGroup>
        <SelectLabel className="font-bold text-indigo-600 px-2 py-1.5 text-xs sticky top-0 bg-white z-10">
          Select Gender
        </SelectLabel>
        <SelectItem 
          value="male" 
          className="text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors duration-150 rounded-md mx-1"
        >
          Male
        </SelectItem>
        <SelectItem 
          value="female"
          className="text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors duration-150 rounded-md mx-1"
        >
          Female
        </SelectItem>
      </SelectGroup>
    </div>
  </SelectContent>
</Select>




<Select defaultValue="1">
  <SelectTrigger className="w-full max-w-xs bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-semibold text-gray-700">
    <SelectValue placeholder="Select a class" />
  </SelectTrigger>
  <SelectContent 
    className="bg-white border-2 border-indigo-100 rounded-lg shadow-lg mt-0"
    position="popper"
    sideOffset={5}
  >
    <div className="max-h-[200px] overflow-y-auto ">
      <SelectGroup>
        <SelectLabel className="font-bold text-indigo-600 px-2 py-1.5 text-sm sticky top-0 bg-white z-10">
          Classes
        </SelectLabel>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <SelectItem 
            key={num}
            value={num.toString()} 
            className="font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors duration-150 rounded-md mx-1"
          >
            Class {num}
          </SelectItem>
        ))}
      </SelectGroup>
    </div>
  </SelectContent>
</Select>
          </div>
        </div>

        {/* Results Count */}
       
      </div>

      {/* Table */}
      
    </div>
  );
};

export default TableControl;