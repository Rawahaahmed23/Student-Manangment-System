import React from "react";
import { TriangleAlert, X } from "lucide-react";


const DeleteConfirmPopup = ({ isOpen, onConfirm, onCancel, studentName }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative"
        style={{ animation: "popIn 0.15s ease-out" }}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
          <TriangleAlert className="w-6 h-6 text-red-500" />
        </div>

        {/* Text */}
        <h2 className="text-center text-gray-900 font-semibold text-lg mb-1">
          Delete Student
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Are you sure you want to delete{" "}
          {studentName ? (
            <span className="font-medium text-gray-700">{studentName}</span>
          ) : (
            "this student"
          )}
          ? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>

      {/* Simple pop-in animation */}
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmPopup;

