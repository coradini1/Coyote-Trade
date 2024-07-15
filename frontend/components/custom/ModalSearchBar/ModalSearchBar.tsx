import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./ModalSearchBar.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalSearchBar({ isOpen, onClose, children }: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay overflow-y-auto" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={onClose} className="text-red-500">
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="modal-body">
          <h3>Results of the search</h3>
          <div className="stock-list">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ModalSearchBar;
