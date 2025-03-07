import  { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { bookmarkService } from "../../services/bookmarkService";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/components/BookmarkForm.css";
import {
  Link,
  TextT,
  TextAlignLeft,
  Tag,
  Image,
  BookOpen,
  PushPin,
  Check,
  X,
} from "@phosphor-icons/react";

const BookmarkForm = ({ onBookmarkAdded, onCancel }) => {
  useTheme();
  
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: "",
    tags: "",
    in_reading_list: false,
    reading_priority: "none",
    pinned: false,
    favicon: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Format tags from comma-separated string to array
      const formattedData = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
        reading_priority:
          formData.reading_priority === "none"
            ? null
            : formData.reading_priority,
      };

      // If URL is submitted without http/https, add https://
      if (formattedData.url && !formattedData.url.match(/^https?:\/\//)) {
        formattedData.url = "https://" + formattedData.url;
      }

      const response = await bookmarkService.createBookmark(formattedData);

      toast.success("Bookmark added successfully!");

      // Clear the form
      setFormData({
        url: "",
        title: "",
        description: "",
        tags: "",
        in_reading_list: false,
        reading_priority: "none",
        pinned: false,
        favicon: "",
      });

      // Notify parent component
      if (onBookmarkAdded) {
        onBookmarkAdded(response.data.data);
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      toast.error(error.response?.data?.message || "Failed to add bookmark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bookmark-form">
      <form onSubmit={handleSubmit}>
        {/* URL Field */}
        <div className="form-group">
          <label htmlFor="url" className="form-label">
            <span className="form-label-icon">
              <Link size={18} weight="duotone" />
            </span>
            URL <span className="form-required">*</span>
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="form-input"
            placeholder="https://example.com"
            required
          />
        </div>

        {/* Title Field */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            <span className="form-label-icon">
              <TextT size={18} weight="duotone" />
            </span>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="My Bookmark"
          />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            <span className="form-label-icon">
              <TextAlignLeft size={18} weight="duotone" />
            </span>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="form-textarea"
            placeholder="Brief description of the bookmark"
          />
        </div>

        {/* Tags Field */}
        <div className="form-group">
          <label htmlFor="tags" className="form-label">
            <span className="form-label-icon">
              <Tag size={18} weight="duotone" />
            </span>
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="form-input"
            placeholder="work, research, tutorial"
          />
        </div>

        {/* Favicon Field */}
        <div className="form-group">
          <label htmlFor="favicon" className="form-label">
            <span className="form-label-icon">
              <Image size={18} weight="duotone" />
            </span>
            Favicon URL
          </label>
          <input
            type="text"
            id="favicon"
            name="favicon"
            value={formData.favicon}
            onChange={handleChange}
            className="form-input"
            placeholder="https://example.com/favicon.ico"
          />
        </div>

        {/* Checkboxes for Reading List and Pinned */}
        <div className="form-checkbox-group">
          <div className="form-checkbox-container">
            <div className="form-checkbox-input">
              <input
                type="checkbox"
                id="in_reading_list"
                name="in_reading_list"
                checked={formData.in_reading_list}
                onChange={handleChange}
                className="form-checkbox"
              />
              <label htmlFor="in_reading_list" className="form-checkbox-label">
                <BookOpen
                  size={18}
                  className="form-checkbox-icon"
                  weight={formData.in_reading_list ? "fill" : "regular"}
                />
                Add to Reading List
              </label>
            </div>
          </div>

          <div className="form-checkbox-container">
            <div className="form-checkbox-input">
              <input
                type="checkbox"
                id="pinned"
                name="pinned"
                checked={formData.pinned}
                onChange={handleChange}
                className="form-checkbox"
              />
              <label htmlFor="pinned" className="form-checkbox-label">
                <PushPin
                  size={18}
                  className="form-checkbox-icon"
                  weight={formData.pinned ? "fill" : "regular"}
                />
                Pin to Top
              </label>
            </div>
          </div>
        </div>

        {/* Reading Priority Dropdown (conditionally rendered) */}
        {formData.in_reading_list && (
          <div className="form-select-group">
            <label htmlFor="reading_priority" className="form-label">
              <svg
                className="form-label-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
                  fill="currentColor"
                />
              </svg>
              Reading Priority
            </label>
            <select
              id="reading_priority"
              name="reading_priority"
              value={formData.reading_priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        )}

        {/* Form Buttons */}
        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="form-button form-button-secondary"
              disabled={loading}
            >
              <X size={18} className="form-button-icon" weight="bold" />
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="form-button form-button-primary"
            disabled={loading}
          >
            <Check size={18} className="form-button-icon" weight="bold" />
            {loading ? "Adding..." : "Add Bookmark"}
          </button>
        </div>
      </form>
    </div>
  );
};

BookmarkForm.propTypes = {
  onBookmarkAdded: PropTypes.func,
  onCancel: PropTypes.func,
};
export default BookmarkForm;
