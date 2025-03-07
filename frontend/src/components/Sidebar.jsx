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
import PropTypes from "prop-types";
import "../styles/components/Sidebar.css";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({ toggleTheme }) => {
  const location = useLocation();
  const { currentTheme } = useTheme();

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

  // Get theme icon
  const getThemeIcon = () => {
    switch (currentTheme) {
      case "cyberpunk":
        return <PaintBucket size={20} className="sidebar-theme-icon" />;
      case "light":
        return <Sun size={20} className="sidebar-theme-icon" />;
      case "dark":
      default:
        return <Moon size={20} className="sidebar-theme-icon" />;
    }
  };

  // Get theme display name
  const getThemeDisplayName = () => {
    switch (currentTheme) {
      case "cyberpunk":
        return "Cyberpunk";
      case "light":
        return "Light Mode";
      case "dark":
      default:
        return "Dark Mode";
    }
  };

  return (
    <div className="sidebar-container">
      {/* App Logo & Title */}
      <div className="sidebar-logo">
        <Bookmark
          size={32}
          weight="duotone"
          className="sidebar-logo-icon"
        />
        <h1 className="sidebar-title">My Bookmarks</h1>
      </div>

      {/* Divider */}
      <div className="sidebar-divider"></div>

      {/* Navigation Section */}
      <div className="sidebar-section">
        <h2 className="sidebar-section-title">
          Navigation
        </h2>

        <Link
          to="/dashboard"
          className={`sidebar-nav-item ${
            isActive("/dashboard") &&
            !location.pathname.includes("reading-list")
              ? "sidebar-nav-item-active"
              : ""
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
            className="sidebar-nav-icon"
          />
          <span>All Bookmarks</span>
        </Link>

        <Link
          to="/dashboard/reading-list"
          className={`sidebar-nav-item ${
            isActive("/dashboard/reading-list")
              ? "sidebar-nav-item-active"
              : ""
          }`}
        >
          <List
            size={20}
            weight={isActive("/dashboard/reading-list") ? "fill" : "regular"}
            className="sidebar-nav-icon"
          />
          <span>Reading List</span>
        </Link>

        <Link
          to="/dashboard/folders"
          className={`sidebar-nav-item ${
            isActive("/dashboard/folders")
              ? "sidebar-nav-item-active"
              : ""
          }`}
        >
          <Folders
            size={20}
            weight={isActive("/dashboard/folders") ? "fill" : "regular"}
            className="sidebar-nav-icon"
          />
          <span>Folders</span>
        </Link>
      </div>

      {/* Spacer */}
      <div className="sidebar-spacer"></div>

      {/* Theme Toggler & Settings */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-row">
          <button
            onClick={toggleTheme}
            className="sidebar-theme-button"
          >
            {getThemeIcon()}
            <span>{getThemeDisplayName()}</span>
          </button>

          <Link
            to="/dashboard/settings"
            className="sidebar-settings-button"
          >
            <GearSix size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  toggleTheme: PropTypes.func.isRequired
};

export default Sidebar;
