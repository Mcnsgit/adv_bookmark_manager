import  { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import BookmarkForm from "./BookmarkForm";

const BookmarkModal = ({
  isOpen,
  onClose,
  onBookmarkAdded,
  darkMode = true,
}) => {
  const modalRef = useRef(null);

  // Define theme classes
  const themeClasses = {
    overlay: "bg-black bg-opacity-75",
    modal: darkMode
      ? "bg-gray-800 border border-gray-700"
      : "bg-white border border-gray-300",
    header: darkMode
      ? "border-gray-700 text-white"
      : "border-gray-200 text-gray-900",
    closeButton: darkMode
      ? "text-gray-400 hover:text-white"
      : "text-gray-500 hover:text-gray-800",
  };

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
    <div
      className={`fixed inset-0 ${themeClasses.overlay} flex items-center justify-center z-50 p-4 backdrop-blur-sm`}
    >
      <div
        ref={modalRef}
        className={`${themeClasses.modal} rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideIn`}
        style={{
          boxShadow: darkMode
            ? "0 0 20px rgba(0, 255, 255, 0.15), 0 0 60px rgba(0, 0, 0, 0.3)"
            : "0 0 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          className={`p-4 border-b ${themeClasses.header} flex justify-between items-center`}
        >
          <h2 className="text-xl font-semibold">Add New Bookmark</h2>
          <button
            onClick={onClose}
            className={`rounded-full p-1 transition-colors ${themeClasses.closeButton} focus:outline-none hover:bg-opacity-20 hover:bg-gray-500`}
          >
            <X size={24} weight="bold" />
          </button>
        </div>
        <div className="p-6">
          <BookmarkForm
            onBookmarkAdded={(bookmark) => {
              onBookmarkAdded(bookmark);
              onClose();
            }}
            onCancel={onClose}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BookmarkModal;
