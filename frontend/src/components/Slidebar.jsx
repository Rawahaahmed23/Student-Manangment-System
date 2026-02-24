import React, { useState } from "react";
import { Grid3x3, Users, Calendar, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <Grid3x3 size={20} />, label: "Dashboard", path: "/Dashboard" },
    { icon: <Users size={20} />, label: "Student Data", path: "/StudentDetails" },
    { icon: <FaUserPlus size={20} />, label: "Add Student", path: "/addstudent" },
    { icon: <Calendar size={20} />, label: "Fees Tracker", path: "/feestracker" },
    { icon: <Calendar size={20} />, label: "Fees Voucher", path: "/feesvoucher" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex fixed top-0 left-0 h-full bg-slate-800 text-white flex-col
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? "w-64" : "w-16"}`}
      >
        <nav className="flex-1 flex flex-col mt-16 space-y-2 p-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-3 rounded transition-colors
                ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
              }
            >
              <span className="flex justify-center w-6">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-800 text-white flex justify-around items-center py-2 z-50">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs
              ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Toggle Button (Desktop only) */}
      <button
        className="hidden md:flex fixed top-4 left-2 z-50 w-10 h-10 items-center justify-center text-white bg-slate-800 rounded hover:bg-slate-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
    </>
  );
};

export default Sidebar;