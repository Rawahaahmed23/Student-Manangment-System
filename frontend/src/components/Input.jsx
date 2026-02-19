import React from "react";

const Input = React.forwardRef(({ label, type, name, placeholder }, ref) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl 
        focus:outline-none focus:border-yellow-500 focus:bg-white 
        focus:shadow-lg focus:shadow-yellow-500/10 transition-all"
      />
    </div>
  );
});

export default Input;
