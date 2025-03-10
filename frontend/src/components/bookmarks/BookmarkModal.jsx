import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import BookmarkForm from "./BookmarkForm";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/components/Modal.css";

const BookmarkModal = ({
  isOpen,
  onClose,
  onBookmarkAdded,
  size = "lg",
}) => {
  const modalRef = useRef(null);
   useTheme();

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
        className={`modal-container modal-${size}`}
      >
        <div className="modal-header">
          <h2 className="modal-title">Add New Bookmark</h2>
          <button
            onClick={onClose}
            className="modal-close-button"
            aria-label="Close modal"
          >
            <X size={24} weight="bold" />
          </button>
        </div>
        <div className="modal-body">
          <BookmarkForm
            onBookmarkAdded={(bookmark) => {
              onBookmarkAdded(bookmark);
              onClose();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

BookmarkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBookmarkAdded: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "full"]),
};

export default BookmarkModal;
