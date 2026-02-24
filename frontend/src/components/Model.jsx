 const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-sm relative">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
       
      </button>
    </div>
  </div>
);

export default  Modal
