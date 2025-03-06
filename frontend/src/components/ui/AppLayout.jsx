import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import Sidebar from "../Sidebar";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/layouts/AppLayout.css";

/**
 * Main application layout component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.darkMode - Whether dark mode is enabled
 * @param {string} props.theme - Current theme (dark, light, cyberpunk)
 * @param {Function} props.toggleTheme - Function to toggle theme
 * @param {React.ReactNode} props.children - Layout content
 */
const AppLayout = ({ darkMode, theme, toggleTheme, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Theme-specific toast styles
  const getToastStyle = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          borderLeft: "4px solid #00ffff",
          backgroundColor: "#181830",
          color: "#ffffff",
        };
      case "light":
        return {
          borderLeft: "4px solid #0099aa",
          backgroundColor: "#ffffff",
          color: "#333333",
        };
      case "dark":
      default:
        return {
          borderLeft: "4px solid #0cc",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        };
    }
  };

  // Close sidebar on window resize (for responsive behavior)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`app-container theme-${theme} ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        darkMode={darkMode}
        theme={theme}
        toggleTheme={toggleTheme}
        className="sidebar"
      />

      {/* Sidebar backdrop (mobile only) */}
      <div
        className="sidebar-backdrop"
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Custom grid background for cyberpunk/dark effect */}
      {(theme === "dark" || theme === "cyberpunk") && (
        <div className="grid-bg"></div>
      )}

      {/* Side gradient accents */}
      <div className="gradient-accent-left"></div>
      <div className="gradient-accent-right"></div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="page-container fade-in">{children}</div>
      </div>

      {/* Toast container with theme-aware styling */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastStyle={getToastStyle()}
      />
    </div>
  );
};

AppLayout.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  theme: PropTypes.oneOf(["dark", "light", "cyberpunk"]).isRequired,
  toggleTheme: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppLayout;
