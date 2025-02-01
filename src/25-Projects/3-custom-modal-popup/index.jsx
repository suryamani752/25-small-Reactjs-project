import { useState } from "react";
import ModalPopup from "./modalPopup";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Show Modal
      </button>

      {/* Modal */}
      <ModalPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Hello Suryamani! 👋</h2>
        <p className="text-blue-600 mb-6">
          You can put any content here!
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 hover:text-red-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </ModalPopup>
    </div>
  );
}

export default Modal;
