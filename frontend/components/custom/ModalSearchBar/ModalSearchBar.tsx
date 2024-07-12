import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import './ModalSearchBar.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalSearchBar({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={onClose} className="text-red-500">
            <AiOutlineClose />
          </button>
        </div>
        <div className="modal-body">
          <h3>Results of the search</h3>
          <div className="stock-list">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSearchBar;
