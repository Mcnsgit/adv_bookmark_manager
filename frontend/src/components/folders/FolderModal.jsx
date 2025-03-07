import  { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useFolders } from "../../context/FolderContext";
import { useTheme } from "../../context/ThemeContext";
import FolderForm from "./FolderForm";
import { X } from "@phosphor-icons/react";
import "../../styles/components/Modal.css";

const FolderModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const { currentTheme } = useTheme();
  const { editingFolder } = useFolders();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div
        ref={modalRef}
        className="modal-container modal-md"
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {editingFolder ? "Edit Folder" : "Create New Folder"}
          </h2>
          <button
            onClick={onClose}
            className="modal-close-button"
            aria-label="Close modal"
          >
            <X size={24} weight="bold" />
          </button>
        </div>
        <div className="modal-body">
          <FolderForm
            folder={editingFolder}
            onSuccess={() => onClose()}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

FolderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default FolderModal;