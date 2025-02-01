import React from "react";

const ModalPopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-700 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Content Area */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default ModalPopup;
