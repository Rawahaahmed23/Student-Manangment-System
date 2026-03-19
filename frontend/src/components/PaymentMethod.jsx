// components/PaymentModal.jsx
import { useState } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function PaymentModal({ student, onClose, onConfirm }) {
  const [months, setMonths] = useState([]);
  const [amount, setAmount] = useState("");

  const toggle = (m) => {
    setMonths((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-5 rounded-xl w-96">

        <h2 className="font-bold mb-3">{student.StudentName}</h2>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {MONTHS.map((m) => (
            <button
              key={m}
              onClick={() => toggle(m)}
              className={`border p-1 text-xs rounded ${
                months.includes(m) ? "bg-indigo-600 text-white" : ""
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Amount"
          className="border w-full p-2 mb-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={() => onConfirm(months, amount)}
            className="bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Confirm
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}