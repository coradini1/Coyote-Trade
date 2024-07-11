import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import './ModalSearchBar.css'; // Create a CSS file for custom styles

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
          <button onClick={onClose} className="close-button">
            <AiOutlineClose size={20} />
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
