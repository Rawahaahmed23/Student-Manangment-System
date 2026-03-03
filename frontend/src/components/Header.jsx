import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../Store/useAuth'; // ✅ add karo

const Header = () => {
  const navigate = useNavigate(); // ✅ andar lao, chhota 'n'
  const { logout } = useAuth();   // ✅ useAuth se logout use karo
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();    
    navigate('/');    
  };

  return (
    <nav className="bg-white border-b w-full h-16 flex items-center justify-between px-8">

      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-yellow-400 rounded"></div>
        <span className="text-sm font-semibold text-gray-800">
          Logo
        </span>
      </div>

      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-400">Admin</span>
        <span className="text-blue-500">Panel</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded transition-colors"
        >
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <span className="text-sm">User</span>
          <ChevronDown size={16} />
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md py-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Header;