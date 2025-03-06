

import  { createContext, useContext, useState, useEffect } from "react";
import { getThemeValues } from "../styles/theme";
import PropTypes from "prop-types";

// Create context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // State for current theme
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [themeValues, setThemeValues] = useState(getThemeValues("dark"));
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setCurrentTheme(savedTheme);
    setThemeValues(getThemeValues(savedTheme));
    setIsDarkMode(savedTheme !== "light");

    // Add theme class to body
    document.body.classList.add(`theme-${savedTheme}`);

    // Dispatch event for other components
    const event = new CustomEvent("themechange", {
      detail: { theme: savedTheme },
    });
    window.dispatchEvent(event);
  }, []);

  // Toggle through themes: dark -> cyberpunk -> light -> dark
  const cycleTheme = () => {
    let newTheme;

    if (currentTheme === "dark") {
      newTheme = "cyberpunk";
    } else if (currentTheme === "cyberpunk") {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }

    setTheme(newTheme);
  };

  // Set a specific theme
  const setTheme = (theme) => {
    // Remove current theme class
    document.body.classList.remove(`theme-${currentTheme}`);

    // Set new theme
    setCurrentTheme(theme);
    setThemeValues(getThemeValues(theme));
    setIsDarkMode(theme !== "light");

    // Add new theme class
    document.body.classList.add(`theme-${theme}`);

    // Save to localStorage
    localStorage.setItem("theme", theme);

    // Dispatch event for other components
    const event = new CustomEvent("themechange", {
      detail: { theme: theme },
    });
    window.dispatchEvent(event);
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
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

  // Context value
  const value = {
    currentTheme,
    themeValues,
    isDarkMode,
    setTheme,
    cycleTheme,
    toggleDarkMode,
    getThemeDisplayName,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default ThemeContext;