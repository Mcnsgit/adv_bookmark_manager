import PropTypes from "prop-types";
import formatDate from "../../utils/formatters/formatDate";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/components/BookmarkCard.css";
import {
  PushPin,
  Trash,
  PencilSimple,
  BookBookmark,
  Tag,
  CalendarBlank,
  Link,
} from "@phosphor-icons/react";

const BookmarkCard = ({
  bookmark,
  onEdit,
  onDelete,
  onToggleReadingList,
  onTogglePinned,
}) => {
  useTheme();
  
  if (!bookmark) return null;

  // Format URL for display (remove http/https and trailing slash)
  const displayUrl = bookmark.url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <div className={`bookmark-card ${bookmark.pinned ? "pinned" : ""}`}>
      {/* Pin indicator for pinned bookmarks */}
      {bookmark.pinned && (
        <div className="bookmark-pin-indicator">
          <div className="bookmark-pin-ribbon">
            <PushPin size={10} weight="fill" />
          </div>
        </div>
      )}

      <div className="bookmark-card-inner">
        {/* URL and favicon section */}
        <div className="bookmark-header">
          {bookmark.favicon ? (
            <div className="bookmark-favicon-container">
              <img
                src={bookmark.favicon}
                alt=""
                className="bookmark-favicon"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="flex items-center justify-center w-full h-full text-cyan-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM152,160a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,160Zm32-40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,120Zm0-40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,80Z"></path>
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
          ) : (
            <div className="bookmark-favicon-container">
              <Link size={20} className="text-cyan-400" weight="duotone" />
            </div>
          )}

          <div className="bookmark-title-container">
            <h3 className={`bookmark-title ${bookmark.pinned ? "pinned" : ""}`}>
              {bookmark.title || "Untitled"}
            </h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bookmark-url"
            >
              {displayUrl}
            </a>
          </div>
        </div>

        {/* Description */}
        {bookmark.description && (
          <div className="bookmark-description">
            <p>{bookmark.description}</p>
          </div>
        )}

        {/* Tags */}
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="bookmark-tags-container">
            <div className="bookmark-tags-header">
              <Tag size={14} className="text-cyan-400" weight="fill" />
              <span className="bookmark-tags-title">Tags</span>
            </div>
            <div className="bookmark-tags-list">
              {bookmark.tags.map((tag) => (
                <span key={tag} className="bookmark-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer with date, priority, and actions */}
        <div className="bookmark-footer">
          {/* Left side - date and priority */}
          <div className="bookmark-footer-left">
            <div className="bookmark-date">
              <CalendarBlank size={14} className="bookmark-date-icon" />
              {formatDate(bookmark.created_at)}
            </div>

            {bookmark.in_reading_list && bookmark.reading_priority && (
              <div className={`bookmark-priority ${bookmark.reading_priority}`}>
                <span className="bookmark-priority-indicator">
                  <span className={`bookmark-priority-pulse`}></span>
                  <span className="bookmark-priority-dot"></span>
                </span>
                {bookmark.reading_priority.charAt(0).toUpperCase() + bookmark.reading_priority.slice(1)}
              </div>
            )}
          </div>

          {/* Right side - action buttons */}
          <div className="bookmark-actions">
            <button
              onClick={() => onToggleReadingList(bookmark._id, bookmark.in_reading_list)}
              className={`bookmark-action-button ${bookmark.in_reading_list ? "active" : ""}`}
              title={bookmark.in_reading_list ? "Remove from reading list" : "Add to reading list"}
            >
              <BookBookmark
                size={18}
                weight={bookmark.in_reading_list ? "fill" : "regular"}
              />
            </button>

            <button
              onClick={() => onTogglePinned(bookmark._id, bookmark.pinned)}
              className={`bookmark-action-button ${bookmark.pinned ? "active" : ""}`}
              title={bookmark.pinned ? "Unpin" : "Pin to top"}
            >
              <PushPin
                size={18}
                weight={bookmark.pinned ? "fill" : "regular"}
              />
            </button>

            <button
              onClick={() => onEdit(bookmark)}
              className="bookmark-action-button"
              title="Edit bookmark"
            >
              <PencilSimple size={18} />
            </button>

            <button
              onClick={() => onDelete(bookmark._id)}
              className="bookmark-action-button delete"
              title="Delete bookmark"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

BookmarkCard.propTypes = {
  bookmark: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    favicon: PropTypes.string,
    created_at: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    tags: PropTypes.arrayOf(PropTypes.string),
    in_reading_list: PropTypes.bool,
    reading_priority: PropTypes.string,
    pinned: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleReadingList: PropTypes.func.isRequired,
  onTogglePinned: PropTypes.func.isRequired,
};


export default BookmarkCard;
