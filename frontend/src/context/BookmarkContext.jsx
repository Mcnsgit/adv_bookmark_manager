import { createContext, useContext, useState, useEffect } from "react";
import { bookmarkService } from "../services/bookmarkService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

// Create context
const BookmarkContext = createContext();

// Custom hook to use the bookmark context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tagParam = searchParams.get("tag");
    const searchParam = searchParams.get("search");

    if (tagParam) {
      setSelectedTag(tagParam);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (location.state?.openAddModal) {
      setIsModalOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Update URL when filters change
  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (searchQuery) {
      searchParams.set("search", searchQuery);
    }

    if (selectedTag && selectedTag !== "all") {
      searchParams.set("tag", selectedTag);
    }

    const queryString = searchParams.toString();
    const newUrl = queryString
      ? `${location.pathname}?${queryString}`
      : location.pathname;

    navigate(newUrl, { replace: true });
  }, [searchQuery, selectedTag, location.pathname, navigate]);

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await bookmarkService.getAllBookmarks();

      if (response.data && Array.isArray(response.data.data)) {
        setBookmarks(response.data.data);
      } else {
        setBookmarks([]);
        console.warn("Unexpected response format:", response);
      }

      setError("");
    } catch (err) {
      setError("Failed to fetch bookmarks");
      console.error(err);
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  // First load of bookmarks
  useEffect(() => {
    fetchBookmarks();
  }, []);

  // Get all unique tags from bookmarks
  const getAllTags = () => {
    const tags = new Set();
    bookmarks.forEach((bookmark) => {
      if (bookmark.tags && Array.isArray(bookmark.tags)) {
        bookmark.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  };

  // Filter bookmarks by tag and search query
  const getFilteredBookmarks = (inReadingListOnly = false) => {
    return bookmarks.filter((bookmark) => {
      // Filter by reading list if needed
      const matchesReadingList = inReadingListOnly
        ? bookmark.in_reading_list
        : true;

      // Filter by tag
      const matchesTag =
        selectedTag === "all" ||
        (bookmark.tags && bookmark.tags.includes(selectedTag));

      // Filter by search query
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        bookmark.title?.toLowerCase().includes(query) ||
        bookmark.description?.toLowerCase().includes(query) ||
        bookmark.url?.toLowerCase().includes(query) ||
        (bookmark.tags &&
          bookmark.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesReadingList && matchesTag && matchesSearch;
    });
  };

  // Get sorted bookmarks (pinned first, then by date)
  const getSortedBookmarks = (
    bookmarks,
    sortBy = "date",
    sortOrder = "desc"
  ) => {
    return [...bookmarks].sort((a, b) => {
      // Pinned items first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      // Define priority order for comparison
      const priorityOrder = { high: 3, medium: 2, low: 1, null: 0 };

      // Then sort by the selected criteria
      switch (sortBy) {
        case "priority": {
          const priorityA = priorityOrder[a.reading_priority] || 0;
          const priorityB = priorityOrder[b.reading_priority] || 0;
          return sortOrder === "asc"
            ? priorityA - priorityB
            : priorityB - priorityA;
        }
        case "date":
          return sortOrder === "asc"
            ? new Date(a.created_at) - new Date(b.created_at)
            : new Date(b.created_at) - new Date(a.created_at);
        case "title": {
          const titleA = a.title?.toLowerCase() || "";
          const titleB = b.title?.toLowerCase() || "";
          return sortOrder === "asc"
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
        }
        default:
          return 0;
      }
    });
  };

  // Handle bookmark added
  const handleBookmarkAdded = (newBookmark) => {
    fetchBookmarks();
    toast.success("Bookmark added successfully!");
  };

  // Handle bookmark edit
  const handleEditBookmark = (bookmark) => {
    console.log("Edit bookmark:", bookmark);
    toast.info("Edit functionality will be implemented soon!");
  };

  // Handle bookmark deletion
  const handleDeleteBookmark = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bookmark?"))
      return;

    try {
      await bookmarkService.deleteBookmark(id);
      fetchBookmarks();
      toast.success("Bookmark deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete bookmark");
      console.error(err);
    }
  };

  // Toggle bookmark's reading list status
  const handleToggleReadingList = async (id, currentStatus) => {
    try {
      const updatedBookmark = {
        in_reading_list: !currentStatus,
        reading_priority: !currentStatus ? "medium" : null,
      };

      await bookmarkService.updateBookmark(id, updatedBookmark);
      fetchBookmarks();

      toast.success(
        `Bookmark ${!currentStatus ? "added to" : "removed from"} reading list`
      );
    } catch (err) {
      toast.error("Failed to update bookmark");
      console.error(err);
    }
  };

  // Toggle pinned status
  const handleTogglePinned = async (id, currentStatus) => {
    try {
      const updatedBookmark = {
        pinned: !currentStatus,
      };

      await bookmarkService.updateBookmark(id, updatedBookmark);
      fetchBookmarks();

      toast.success(`Bookmark ${!currentStatus ? "pinned" : "unpinned"}`);
    } catch (err) {
      toast.error("Failed to update bookmark");
      console.error(err);
    }
  };

  // Update priority
  const handleUpdatePriority = async (id, newPriority) => {
    try {
      const updatedBookmark = {
        reading_priority: newPriority,
      };

      await bookmarkService.updateBookmark(id, updatedBookmark);
      fetchBookmarks();

      toast.success(`Priority updated to ${newPriority}`);
    } catch (err) {
      toast.error("Failed to update priority");
      console.error(err);
    }
  };

  // Get priority counts
  const getPriorityCounts = () => {
    const counts = { high: 0, medium: 0, low: 0, none: 0 };

    bookmarks
      .filter((bookmark) => bookmark.in_reading_list)
      .forEach((bookmark) => {
        if (!bookmark.reading_priority) {
          counts.none++;
        } else {
          counts[bookmark.reading_priority]++;
        }
      });

    return counts;
  };

  const value = {
    bookmarks,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    isModalOpen,
    setIsModalOpen,
    fetchBookmarks,
    getAllTags,
    getFilteredBookmarks,
    getSortedBookmarks,
    handleBookmarkAdded,
    handleEditBookmark,
    handleDeleteBookmark,
    handleToggleReadingList,
    handleTogglePinned,
    handleUpdatePriority,
    getPriorityCounts,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
