
import PropTypes from "prop-types";
import formatDate from "../../utils/formatters/formatDate";
import { useTheme } from "../../context/ThemeContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
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
  const { themeValues } = useTheme();
  
  if (!bookmark) return null;

  // Format URL for display (remove http/https and trailing slash)
  const displayUrl = bookmark.url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  // Determine card props based on bookmark properties
  const cardProps = {
    pinned: bookmark.pinned,
    priority: bookmark.reading_priority || null,
    glow: bookmark.pinned, // Add glow effect to pinned items
  };

  return (
    <Card {...cardProps}>
      <div className="p-4">
        {/* URL and favicon section */}
        <div className="flex items-start space-x-3 mb-3">
          {bookmark.favicon ? (
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-700 bg-black p-1 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              <img
                src={bookmark.favicon}
                alt=""
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="w-8 h-8 flex items-center justify-center text-cyan-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM152,160a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,160Zm32-40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,120Zm0-40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,80Z"></path>
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-700 bg-black p-1 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              <Link size={20} className="text-cyan-400" weight="duotone" />
            </div>
          )}

          <div className="flex-grow min-w-0">
            <h3 className={`text-xl font-bold mb-1 ${bookmark.pinned ? "text-cyan-400" : ""}`}>
              {bookmark.title || "Untitled"}
            </h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline truncate block transition-colors"
            >
              {displayUrl}
            </a>
          </div>
        </div>

        {/* Description with gradient border */}
        {bookmark.description && (
          <div className="mb-4 p-3 border border-gray-800 rounded-md bg-black/40 text-gray-300 text-sm leading-relaxed">
            <p className="line-clamp-3">{bookmark.description}</p>
          </div>
        )}

        {/* Tags with enhanced styling */}
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Tag size={14} className="text-cyan-400 mr-1" weight="fill" />
              <span className="text-xs text-gray-400">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-gray-800 rounded-full text-xs text-cyan-300 border border-gray-700 hover:border-cyan-800 hover:bg-gray-900 transition-all cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer with date, priority, and actions */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-800">
          {/* Left side - date and priority */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-xs text-gray-500">
              <CalendarBlank size={14} className="mr-1 text-gray-400" />
              {formatDate(bookmark.created_at)}
            </div>

            {bookmark.in_reading_list && bookmark.reading_priority && (
              <span
                className={`flex items-center text-xs px-2 py-0.5 rounded-full bg-${bookmark.reading_priority}-900 text-${bookmark.reading_priority}-300 border border-${bookmark.reading_priority}-700`}
              >
                <span className="relative flex h-2 w-2 mr-1">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full text-${bookmark.reading_priority}-300 opacity-75`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 text-${bookmark.reading_priority}-300`}
                  ></span>
                </span>
                {bookmark.reading_priority.charAt(0).toUpperCase() + bookmark.reading_priority.slice(1)}
              </span>
            )}
          </div>

          {/* Right side - action buttons */}
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="xs"
              onClick={() => onToggleReadingList(bookmark._id, bookmark.in_reading_list)}
              className={bookmark.in_reading_list ? "text-amber-400" : "text-gray-400"}
              leftIcon={<BookBookmark size={18} weight={bookmark.in_reading_list ? "fill" : "regular"} />}
              aria-label={bookmark.in_reading_list ? "Remove from reading list" : "Add to reading list"}
            />

            <Button
              variant="outline"
              size="xs"
              onClick={() => onTogglePinned(bookmark._id, bookmark.pinned)}
              className={bookmark.pinned ? "text-cyan-400" : "text-gray-400"}
              leftIcon={<PushPin size={18} weight={bookmark.pinned ? "fill" : "regular"} />}
              aria-label={bookmark.pinned ? "Unpin" : "Pin to top"}
            />

            <Button
              variant="outline"
              size="xs"
              onClick={() => onEdit(bookmark)}
              className="text-gray-400"
              leftIcon={<PencilSimple size={18} />}
              aria-label="Edit bookmark"
            />

            <Button
              variant="outline"
              size="xs"
              onClick={() => onDelete(bookmark._id)}
              className="text-gray-400 hover:text-red-400"
              leftIcon={<Trash size={18} />}
              aria-label="Delete bookmark"
            />
          </div>
        </div>
      </div>
    </Card>
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
