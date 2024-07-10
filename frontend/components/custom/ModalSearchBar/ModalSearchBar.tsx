import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalSearchBar({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2>Search Results</h2>
          <button onClick={onClose} className="text-red-500">
            <AiOutlineClose size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalSearchBar
