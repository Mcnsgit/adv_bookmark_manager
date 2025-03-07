import { useState } from "react";
import { useBookmarks } from "../../context/BookmarkContext";
import { useTheme } from "../../context/ThemeContext";
import BookmarkCard from "./BookmarkCard";
import BookmarkModal from "./BookmarkModal";
import Button from "../ui/Button";
import "../../styles/pages/BookmarkList.css"; // You would create this CSS file
import {
  MagnifyingGlass,
  Plus,
  Bookmark,
  FolderOpen,
  ListPlus,
  Tag,
} from "@phosphor-icons/react";


const BookmarkList = () => {
  const {
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    isModalOpen,
    setIsModalOpen,
    getAllTags,
    getFilteredBookmarks,
    getSortedBookmarks,
    handleBookmarkAdded,
    handleEditBookmark,
    handleDeleteBookmark,
    handleToggleReadingList,
    handleTogglePinned,
  } = useBookmarks();

  const { currentTheme } = useTheme();

  // Get filtered and sorted bookmarks
  const filteredBookmarks = getFilteredBookmarks(false);
  const sortedBookmarks = getSortedBookmarks(filteredBookmarks, "date", "desc");

  if (loading) {
    return (
      <div className="bookmark-list-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="bookmark-list">
      {/* Header with search and add button */}
      <div className="bookmark-list-header">
        <div className="bookmark-list-title">
          <Bookmark
            size={32}
            className="bookmark-list-icon"
            weight="duotone"
          />
          <h1>My Bookmarks</h1>
        </div>

        <div className="bookmark-list-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
              <MagnifyingGlass size={20} />
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus size={20} weight="bold" />}
          >
            Add Bookmark
          </Button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="error-message" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Bookmarks section */}
      <div className="bookmarks-section">
        <div className="section-header">
          <ListPlus
            size={20}
            className="section-icon"
            weight="duotone"
          />
          <h2>Bookmarks</h2>
        </div>

        {/* Bookmarks grid */}
        {sortedBookmarks.length === 0 ? (
          <div className="empty-state">
            <Bookmark
              size={48}
              className="empty-icon"
              weight="light"
            />
            <h3>No bookmarks</h3>
            <p>
              {searchQuery || selectedTag !== "all"
                ? "No bookmarks match your current filters."
                : "Get started by adding a new bookmark."}
            </p>
            <div className="empty-action">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsModalOpen(true)}
                leftIcon={<Plus size={20} weight="bold" />}
              >
                Add Bookmark
              </Button>
            </div>
          </div>
        ) : (
          <div className="bookmarks-grid">
            {sortedBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onEdit={handleEditBookmark}
                onDelete={handleDeleteBookmark}
                onToggleReadingList={handleToggleReadingList}
                onTogglePinned={handleTogglePinned}
              />
            ))}
          </div>
        )}
      </div>

      {/* Tag filter */}
      {getAllTags().length > 0 && (
        <div className="tags-section">
          <div className="section-header">
            <Tag size={20} className="section-icon" weight="duotone" />
            <h2>Filter by Tag</h2>
          </div>
          <div className="tags-list">
            <button
              onClick={() => setSelectedTag("all")}
              className={`tag-button ${selectedTag === "all" ? "active" : ""}`}
            >
              All
            </button>

            {getAllTags().map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`tag-button ${selectedTag === tag ? "active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add Bookmark Modal */}
      <BookmarkModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onBookmarkAdded={handleBookmarkAdded}
            size="lg"
          />
        </div>
      );
    };
export default BookmarkList;
