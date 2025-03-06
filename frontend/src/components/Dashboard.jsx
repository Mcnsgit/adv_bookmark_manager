import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import AppLayout from "./ui/AppLayout";
import BookmarkList from "./bookmarks/BookmarkList";
import ReadingList from "./bookmarks/ReadingList";
import { BookmarkProvider } from "../context/BookmarkContext";

const Dashboard = () => {
  const { currentTheme, isDarkMode, cycleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Check for modal open state in navigation
  useEffect(() => {
    // Check location state for openAddModal flag
    if (location.state?.openAddModal) {
      // We'll pass this to the bookmark list
      // Clear the state so it doesn't persist on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <BookmarkProvider>
      <AppLayout
        darkMode={isDarkMode}
        theme={currentTheme}
        toggleTheme={cycleTheme}
      >
        <Routes>
          <Route index element={<BookmarkList darkMode={isDarkMode} />} />
          <Route
            path="reading-list"
            element={<ReadingList darkMode={isDarkMode} />}
          />
          <Route
            path="folders"
            element={
              <div className="p-6 text-center">Folders Feature Coming Soon</div>
            }
          />
          <Route
            path="settings"
            element={
              <div className="p-6 text-center">
                Settings Feature Coming Soon
              </div>
            }
          />
          <Route path="*" element={<BookmarkList darkMode={isDarkMode} />} />
        </Routes>
      </AppLayout>
    </BookmarkProvider>
  );
};

export default Dashboard;
