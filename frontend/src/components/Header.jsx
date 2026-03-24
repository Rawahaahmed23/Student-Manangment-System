import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../Store/useAuth';

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return {
    bg: `hsl(${hue}, 55%, 92%)`,
    text: `hsl(${hue}, 45%, 35%)`,
  };
};

const Header = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate('/');
  };

  const colors = stringToColor(user.username);

  return (
    <nav className="bg-white border-b border-slate-100 w-full h-16 flex items-center justify-between px-4 sm:px-8 shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-yellow-900 font-bold text-xs">L</span>
        </div>
        <span className="text-sm font-semibold text-slate-700">Logo</span>
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all duration-150 ${
            open
              ? 'bg-slate-100 border-slate-200'
              : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200'
          }`}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {user.username[0].toUpperCase()}
          </div>

          <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[120px] truncate">
            {user.username}
          </span>

          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-lg shadow-slate-100/60 py-2 z-50 overflow-hidden">

            {/* User info header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-50">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                style={{ backgroundColor: colors.bg, color: colors.text }}
              >
                {user.username[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 truncate">{user.username}</p>
                <p className="text-xs text-slate-400">Student Portal</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} className="text-red-400" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;