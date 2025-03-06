import { memo } from "react";
import PropTypes from "prop-types";

const Bookmark = memo(
  ({
    _id,
    url,
    title,
    description,
    in_reading_list,
    reading_priority,
    onEdit,
    onDelete,
    onToggleReadingList,
  }) => {
    // Format URL for display (remove http/https and trailing slash)
    const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

    // Determine the priority label and color
    const getPriorityLabel = () => {
      if (!reading_priority) return null;

      const priorities = {
        low: { label: "Low", color: "bg-blue-100 text-blue-700" },
        medium: { label: "Medium", color: "bg-yellow-100 text-yellow-700" },
        high: { label: "High", color: "bg-red-100 text-red-700" },
      };

      return priorities[reading_priority] || null;
    };

    const priorityInfo = getPriorityLabel();

    return (
      <div className="bookmark-container">
        <div className="bookmark-header flex justify-between items-start mb-2">
          <div className="bookmark-titles">
            <h3 className="text-lg font-semibold line-clamp-1">
              {title || "Untitled"}
            </h3>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline line-clamp-1"
            >
              {displayUrl}
            </a>
          </div>

          <div className="bookmark-actions flex space-x-2">
            <button
              onClick={() => onToggleReadingList(_id, in_reading_list)}
              className={`p-1 rounded hover:bg-gray-100 ${
                in_reading_list ? "text-amber-500" : "text-gray-400"
              }`}
              title={
                in_reading_list
                  ? "Remove from reading list"
                  : "Add to reading list"
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </button>

            <button
              onClick={() => onEdit(_id)}
              className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-500"
              title="Edit bookmark"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              onClick={() => onDelete(_id)}
              className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500"
              title="Delete bookmark"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {description}
          </p>
        )}

        {in_reading_list && priorityInfo && (
          <div className="mb-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${priorityInfo.color}`}
            >
              {priorityInfo.label} Priority
            </span>
          </div>
        )}
      </div>
    );
  }
);

Bookmark.displayName = "Bookmark";

Bookmark.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  in_reading_list: PropTypes.bool,
  reading_priority: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleReadingList: PropTypes.func,
};

Bookmark.defaultProps = {
  description: "",
  in_reading_list: false,
  reading_priority: null,
  onEdit: () => {},
  onDelete: () => {},
  onToggleReadingList: () => {},
};

export default Bookmark;
