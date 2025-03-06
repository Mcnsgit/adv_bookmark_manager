/**
 * Main theme configuration file that exports all theme elements
 */

import colors from "./color";
import typography from "./typography";
import spacing from "./spacing";

// Combined theme object
const theme = {
  colors,
  typography,
  spacing,

  // Add transitions
  transitions: {
    fast: "150ms ease",
    normal: "300ms ease",
    slow: "500ms ease",
  },

  // Grid settings
  grid: {
    // Cyberpunk grid effect
    cyberpunk: {
      backgroundImage:
        "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)",
      backgroundSize: "50px 50px",
      opacity: "0.1",
    },
    // Dark mode grid effect (subtler)
    dark: {
      backgroundImage:
        "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)",
      backgroundSize: "50px 50px",
      opacity: "0.05",
    },
  },

  // Gradient definitions
  gradients: {
    // Vertical gradients for UI elements
    vertical: {
      cyberpunk: "linear-gradient(to bottom, #FF00FF, #00FFFF, #9400FF)",
      dark: "linear-gradient(to bottom, #8B5CF6, #06B6D4, #8B5CF6)",
      light: "linear-gradient(to bottom, #6366F1, #0EA5E9, #6366F1)",
    },
    // Horizontal gradients
    horizontal: {
      cyberpunk: "linear-gradient(to right, #FF00FF, #00FFFF, #9400FF)",
      dark: "linear-gradient(to right, #8B5CF6, #06B6D4, #8B5CF6)",
      light: "linear-gradient(to right, #6366F1, #0EA5E9, #6366F1)",
    },
  },

  // Animation keyframes and durations
  animations: {
    fadeIn: {
      keyframes:
        "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }",
      duration: "300ms",
    },
    slideIn: {
      keyframes:
        "@keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }",
      duration: "300ms",
    },
    pulse: {
      keyframes:
        "@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(0, 255, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); } }",
      duration: "2s",
    },
  },
};

/**
 * Get theme values for the current theme mode
 * @param {string} themeMode - 'dark', 'light', or 'cyberpunk'
 * @returns {Object} - Theme values for the specified mode
 */
export const getThemeValues = (themeMode = "dark") => {
  return {
    colors: colors[themeMode] || colors.dark,
    typography: typography,
    spacing: spacing,
    transitions: theme.transitions,
    grid: theme.grid[themeMode] || theme.grid.dark,
    gradients: {
      vertical:
        theme.gradients.vertical[themeMode] || theme.gradients.vertical.dark,
      horizontal:
        theme.gradients.horizontal[themeMode] ||
        theme.gradients.horizontal.dark,
    },
    animations: theme.animations,
  };
};

export default theme;
