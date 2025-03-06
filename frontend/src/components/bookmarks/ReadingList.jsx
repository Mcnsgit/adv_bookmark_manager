import { useState } from "react";
import BookmarkCard from "./BookmarkCard";
import BookmarkModal from "./BookmarkModal";
import { useBookmarks } from "../../context/BookmarkContext";
import {
  MagnifyingGlass,
  Plus,
  BookOpen,
  Tag,
  SortAscending,
  SortDescending,
} from "@phosphor-icons/react";

const ReadingList = ({ darkMode = true }) => {
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
    getPriorityCounts,
  } = useBookmarks();

  // Additional state for reading list specific sorting
  const [sortBy, setSortBy] = useState("priority"); // priority, date, title
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc

  // Get filtered bookmarks (reading list only) and sort them
  const readingListBookmarks = getFilteredBookmarks(true);
  const sortedBookmarks = getSortedBookmarks(
    readingListBookmarks,
    sortBy,
    sortOrder
  );

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
    sortActive: darkMode
      ? "bg-cyan-900 text-cyan-300 border-cyan-700"
      : "bg-cyan-100 text-cyan-700 border-cyan-300",
    sortInactive: darkMode
      ? "bg-gray-800 text-gray-400 border-gray-700"
      : "bg-gray-100 text-gray-600 border-gray-300",
  };

  // Get priority counts for stats
  const priorityCounts = getPriorityCounts();

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
          <BookOpen size={32} className="mr-2 text-cyan-400" weight="duotone" />
          <h1 className="text-3xl font-bold">Reading List</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search reading list..."
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
            Add to Reading List
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

      {/* Reading List Stats */}
      <div className="mb-6 p-4 border border-gray-800 rounded-lg bg-gray-800/50">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <BookOpen size={20} className="mr-2 text-cyan-400" weight="duotone" />
          Reading List Stats
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-gray-900 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Items</p>
            <p className="text-2xl font-bold text-white">
              {readingListBookmarks.length}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gray-900 border border-red-900/50">
            <p className="text-red-400 text-sm">High Priority</p>
            <p className="text-2xl font-bold text-red-400">
              {priorityCounts.high}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gray-900 border border-yellow-900/50">
            <p className="text-yellow-400 text-sm">Medium Priority</p>
            <p className="text-2xl font-bold text-yellow-400">
              {priorityCounts.medium}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gray-900 border border-blue-900/50">
            <p className="text-blue-400 text-sm">Low Priority</p>
            <p className="text-2xl font-bold text-blue-400">
              {priorityCounts.low}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        {/* Tag filter */}
        {getAllTags().length > 0 && (
          <div className="flex-grow">
            <div className="flex items-center mb-2">
              <Tag size={16} className="mr-2 text-cyan-400" weight="fill" />
              <h3 className="text-sm font-medium">Filter by Tag</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("all")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
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
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
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

        {/* Sort controls */}
        <div className="flex gap-2 items-end">
          <div>
            <p className="text-xs text-gray-400 mb-1">Sort by</p>
            <div className="flex border border-gray-700 rounded-md overflow-hidden">
              <button
                onClick={() => setSortBy("priority")}
                className={`px-3 py-1 text-xs font-medium ${
                  sortBy === "priority"
                    ? themeClasses.sortActive
                    : themeClasses.sortInactive
                }`}
              >
                Priority
              </button>
              <button
                onClick={() => setSortBy("date")}
                className={`px-3 py-1 text-xs font-medium ${
                  sortBy === "date"
                    ? themeClasses.sortActive
                    : themeClasses.sortInactive
                }`}
              >
                Date
              </button>
              <button
                onClick={() => setSortBy("title")}
                className={`px-3 py-1 text-xs font-medium ${
                  sortBy === "title"
                    ? themeClasses.sortActive
                    : themeClasses.sortInactive
                }`}
              >
                Title
              </button>
            </div>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 rounded-md bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
            title={sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
          >
            {sortOrder === "asc" ? (
              <SortAscending size={16} className="text-gray-300" />
            ) : (
              <SortDescending size={16} className="text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Bookmarks grid */}
      {sortedBookmarks.length === 0 ? (
        <div
          className={`text-center py-12 rounded-lg border ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <BookOpen
            size={48}
            className="mx-auto text-gray-500 mb-3"
            weight="light"
          />
          <h3 className="text-xl font-medium">Your reading list is empty</h3>
          <p
            className={`mt-2 text-base ${themeClasses.secondaryText} max-w-md mx-auto`}
          >
            {searchQuery || selectedTag !== "all"
              ? "No items match your current filters."
              : "Add bookmarks to your reading list to keep track of things you want to read later."}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium ${themeClasses.primaryButton}`}
            >
              <Plus size={20} className="mr-2" weight="bold" />
              Add to Reading List
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

      {/* Add Bookmark Modal */}
      <BookmarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookmarkAdded={handleBookmarkAdded}
        darkMode={darkMode}
      />
    </div>
  );
};

export default ReadingList;
