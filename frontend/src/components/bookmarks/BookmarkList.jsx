import React from "react";
import BookmarkCard from "./BookmarkCard";
import BookmarkModal from "./BookmarkModal";
import { useBookmarks } from "../../context/BookmarkContext";
// Import phosphor icons
import {
  MagnifyingGlass,
  Plus,
  Bookmark,
  FolderOpen,
  ListPlus,
  Tag,
} from "@phosphor-icons/react";

const BookmarkList = ({ darkMode = true }) => {
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

  // Get filtered and sorted bookmarks
  const filteredBookmarks = getFilteredBookmarks(false);
  const sortedBookmarks = getSortedBookmarks(filteredBookmarks, "date", "desc");

  // Define theme classes
  const themeClasses = {
    background: darkMode ? "bg-gray-900" : "bg-gray-100",
    text: darkMode ? "text-gray-100" : "text-gray-900",
    secondaryText: darkMode ? "text-gray-400" : "text-gray-600",
    card: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300",
    input: darkMode
      ? "bg-gray-800 border-gray-700 text-white"
      : "bg-white border-gray-300",
    primaryButton: "bg-purple-600 hover:bg-purple-700 text-white",
    secondaryButton: darkMode
      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
      : "bg-gray-200 hover:bg-gray-300 text-gray-700",
    highlight: "text-cyan-400",
    tagSelected: "bg-cyan-500 text-white",
    tagNormal: darkMode
      ? "bg-gray-700 text-gray-300"
      : "bg-gray-200 text-gray-700",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with search and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center">
          <Bookmark
            size={32}
            className="mr-2 text-cyan-400"
            weight="duotone"
          />
          <h1 className="text-3xl font-bold">My Bookmarks</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${themeClasses.input}`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass size={20} className="text-gray-400" />
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${themeClasses.primaryButton}`}
          >
            <Plus size={20} className="mr-2" weight="bold" />
            Add Bookmark
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-md relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Bookmarks section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <ListPlus
            size={20}
            className="mr-2 text-cyan-400"
            weight="duotone"
          />
          <h2 className="text-lg font-semibold">Bookmarks</h2>
        </div>

        {/* Bookmarks grid */}
        {sortedBookmarks.length === 0 ? (
          <div
            className={`text-center py-10 rounded-lg border ${
              darkMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <Bookmark
              size={48}
              className="mx-auto text-gray-500 mb-3"
              weight="light"
            />
            <h3 className="text-lg font-medium">No bookmarks</h3>
            <p className={`mt-1 text-sm ${themeClasses.secondaryText}`}>
              {searchQuery || selectedTag !== "all"
                ? "No bookmarks match your current filters."
                : "Get started by adding a new bookmark."}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium ${themeClasses.primaryButton}`}
              >
                <Plus size={20} className="mr-2" weight="bold" />
                Add Bookmark
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onEdit={handleEditBookmark}
                onDelete={handleDeleteBookmark}
                onToggleReadingList={handleToggleReadingList}
                onTogglePinned={handleTogglePinned}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Bookmark Modal */}
      <BookmarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookmarkAdded={handleBookmarkAdded}
        darkMode={darkMode}
      />

      {/* Tag filter */}
      {getAllTags().length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Tag size={20} className="mr-2 text-cyan-400" weight="duotone" />
            <h2 className="text-lg font-semibold">Filter by Tag</h2>
          </div>
          <div className="flex flex-wrap gap-2 pb-2">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === "all"
                  ? themeClasses.tagSelected
                  : themeClasses.tagNormal
              }`}
            >
              All
            </button>

            {getAllTags().map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? themeClasses.tagSelected
                    : themeClasses.tagNormal
                }`}
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
          darkMode={darkMode}
          />
    </div>
  );
}
export default BookmarkList;
