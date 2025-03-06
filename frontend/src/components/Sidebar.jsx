import {
  Bookmark,
  List,
  Folders,
  GearSix,
  Moon,
  Sun,
  PaintBucket,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ darkMode, theme, toggleTheme }) => {
  const location = useLocation();

  // Define function to check if a path is active (updated to work with nested routes)
  const isActive = (path) => {
    if (path === "/dashboard") {
      // Dashboard index route should be active when at /dashboard or /dashboard/
      return (
        location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/"
      );
    }
    return location.pathname.includes(path);
  };

  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          sidebar: "bg-cyber-black border-cyber-blue",
          highlight: "text-cyber-cyan",
          activeNav: "bg-cyber-blue text-cyber-cyan border-cyber-cyan",
          inactiveNav: "text-gray-300 hover:bg-cyber-blue hover:text-white",
          themeIcon: "text-cyber-yellow",
        };
      case "light":
        return {
          sidebar: "bg-white border-gray-200",
          highlight: "text-blue-600",
          activeNav: "bg-blue-50 text-blue-600 border-blue-500",
          inactiveNav: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          themeIcon: "text-gray-600",
        };
      case "dark":
      default:
        return {
          sidebar: "bg-gray-900 border-gray-800",
          highlight: "text-cyan-400",
          activeNav: "bg-gray-800 text-cyan-400 border-cyan-400",
          inactiveNav: "text-gray-300 hover:bg-gray-800 hover:text-white",
          themeIcon: "text-yellow-400",
        };
    }
  };

  const styles = getThemeStyles();

  // Get theme display name
  const getThemeDisplayName = () => {
    switch (theme) {
      case "cyberpunk":
        return "Cyberpunk";
      case "light":
        return "Light Mode";
      case "dark":
      default:
        return "Dark Mode";
    }
  };

  // Get theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case "cyberpunk":
        return <PaintBucket size={20} className="text-cyber-yellow" />;
      case "light":
        return <Sun size={20} className="text-amber-500" />;
      case "dark":
      default:
        return <Moon size={20} className="text-blue-400" />;
    }
  };

  return (
    <div
      className={`sidebar-container h-full min-h-screen w-64 py-4 px-2 flex flex-col border-r ${styles.sidebar}`}
    >
      {/* App Logo & Title */}
      <div className="flex items-center mb-8 px-4">
        <Bookmark
          size={32}
          weight="duotone"
          className={styles.highlight + " mr-3"}
        />
        <h1 className="text-2xl font-bold font-cyber-text">My Bookmarks</h1>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-6 border-b border-gray-800"></div>

      {/* Navigation Section */}
      <div className="space-y-1 px-2 mb-6">
        <h2 className={`px-4 mb-2 text-lg font-medium ${styles.highlight}`}>
          Navigation
        </h2>

        <Link
          to="/dashboard"
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-md transition-colors ${
            isActive("/dashboard") &&
            !location.pathname.includes("reading-list")
              ? `${styles.activeNav} border-l-4`
              : styles.inactiveNav
          }`}
        >
          <Bookmark
            size={20}
            weight={
              isActive("/dashboard") &&
              !location.pathname.includes("reading-list")
                ? "fill"
                : "regular"
            }
          />
          <span>All Bookmarks</span>
        </Link>

        <Link
          to="/dashboard/reading-list"
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-md transition-colors ${
            isActive("/dashboard/reading-list")
              ? `${styles.activeNav} border-l-4`
              : styles.inactiveNav
          }`}
        >
          <List
            size={20}
            weight={isActive("/dashboard/reading-list") ? "fill" : "regular"}
          />
          <span>Reading List</span>
        </Link>

        <Link
          to="/dashboard/folders"
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-md transition-colors ${
            isActive("/dashboard/folders")
              ? `${styles.activeNav} border-l-4`
              : styles.inactiveNav
          }`}
        >
          <Folders
            size={20}
            weight={isActive("/dashboard/folders") ? "fill" : "regular"}
          />
          <span>Folders</span>
        </Link>
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Theme Toggler & Settings */}
      <div className="px-4 mb-2">
        <div className="flex justify-between">
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {getThemeIcon()}
            <span>{getThemeDisplayName()}</span>
          </button>

          <Link
            to="/dashboard/settings"
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <GearSix size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
