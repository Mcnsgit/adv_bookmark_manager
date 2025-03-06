import { useState } from "react";
import { toast } from "react-toastify";
import { bookmarkService } from "../../services/bookmarkService";
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

const BookmarkForm = ({ onBookmarkAdded, onCancel, darkMode = true }) => {
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

  // Define theme classes
  const themeClasses = {
    text: darkMode ? "text-gray-100" : "text-gray-900",
    label: darkMode ? "text-gray-300" : "text-gray-700",
    input: darkMode
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500",
    checkbox: darkMode
      ? "text-cyan-500 bg-gray-700 border-gray-600 focus:ring-cyan-500"
      : "text-blue-600 bg-white border-gray-300 focus:ring-blue-500",
    button: {
      primary: "bg-cyan-600 hover:bg-cyan-700 text-white",
      secondary: darkMode
        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
        : "bg-gray-200 hover:bg-gray-300 text-gray-700",
    },
    icon: "text-cyan-500",
    select: darkMode
      ? "bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500",
  };

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
    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg`}>
      <form onSubmit={handleSubmit}>
        {/* URL Field */}
        <div className="mb-5">
          <label
            htmlFor="url"
            className={`flex items-center gap-2 text-sm font-medium ${themeClasses.label} mb-2`}
          >
            <Link size={18} className={themeClasses.icon} weight="duotone" />
            URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.input} transition-colors`}
            placeholder="https://example.com"
            required
          />
        </div>

        {/* Title Field */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className={`flex items-center gap-2 text-sm font-medium ${themeClasses.label} mb-2`}
          >
            <TextT size={18} className={themeClasses.icon} weight="duotone" />
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.input} transition-colors`}
            placeholder="My Bookmark"
          />
        </div>

        {/* Description Field */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className={`flex items-center gap-2 text-sm font-medium ${themeClasses.label} mb-2`}
          >
            <TextAlignLeft
              size={18}
              className={themeClasses.icon}
              weight="duotone"
            />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.input} transition-colors`}
            placeholder="Brief description of the bookmark"
          />
        </div>

        {/* Tags Field */}
        <div className="mb-5">
          <label
            htmlFor="tags"
            className={`flex items-center gap-2 text-sm font-medium ${themeClasses.label} mb-2`}
          >
            <Tag size={18} className={themeClasses.icon} weight="duotone" />
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.input} transition-colors`}
            placeholder="work, research, tutorial"
          />
        </div>

        {/* Favicon Field */}
        <div className="mb-5">
          <label
            htmlFor="favicon"
            className={`flex items-center gap-2 text-sm font-medium ${themeClasses.label} mb-2`}
          >
            <Image size={18} className={themeClasses.icon} weight="duotone" />
            Favicon URL
          </label>
          <input
            type="text"
            id="favicon"
            name="favicon"
            value={formData.favicon}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.input} transition-colors`}
            placeholder="https://example.com/favicon.ico"
          />
        </div>

        {/* Checkboxes for Reading List and Pinned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div
            className={`p-3 rounded-md border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id="in_reading_list"
                name="in_reading_list"
                checked={formData.in_reading_list}
                onChange={handleChange}
                className={`h-4 w-4 rounded focus:ring-offset-0 ${themeClasses.checkbox}`}
              />
              <label
                htmlFor="in_reading_list"
                className={`flex items-center ml-2 text-sm ${themeClasses.text}`}
              >
                <BookOpen
                  size={18}
                  className="mr-2"
                  weight={formData.in_reading_list ? "fill" : "regular"}
                />
                Add to Reading List
              </label>
            </div>
          </div>

          <div
            className={`p-3 rounded-md border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pinned"
                name="pinned"
                checked={formData.pinned}
                onChange={handleChange}
                className={`h-4 w-4 rounded focus:ring-offset-0 ${themeClasses.checkbox}`}
              />
              <label
                htmlFor="pinned"
                className={`flex items-center ml-2 text-sm ${themeClasses.text}`}
              >
                <PushPin
                  size={18}
                  className="mr-2"
                  weight={formData.pinned ? "fill" : "regular"}
                />
                Pin to Top
              </label>
            </div>
          </div>
        </div>

        {/* Reading Priority Dropdown (conditionally rendered) */}
        {formData.in_reading_list && (
          <div className="mb-6">
            <label
              htmlFor="reading_priority"
              className={`flex items-center gap-2 text-sm font-medium ${themeClasses.label} mb-2`}
            >
              <svg
                className="w-5 h-5 text-cyan-500"
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
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.select} transition-colors`}
            >
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        )}

        {/* Form Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={`flex items-center px-5 py-2.5 text-sm font-medium rounded-md transition-colors ${themeClasses.button.secondary}`}
              disabled={loading}
            >
              <X size={18} className="mr-2" weight="bold" />
              Cancel
            </button>
          )}

          <button
            type="submit"
            className={`flex items-center px-5 py-2.5 text-sm font-medium rounded-md transition-colors ${themeClasses.button.primary}`}
            disabled={loading}
          >
            <Check size={18} className="mr-2" weight="bold" />
            {loading ? "Adding..." : "Add Bookmark"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookmarkForm;
