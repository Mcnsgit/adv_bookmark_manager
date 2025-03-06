/**
 * Color palette configuration for the bookmark manager application
 * Organized by theme (dark, light, cyberpunk) and purpose
 */

const colors = {
  // Base theme colors
  dark: {
    background: {
      primary: "#121212",
      secondary: "#1E1E1E",
      tertiary: "#2A2A2A",
      elevated: "#333333",
      card: "#1A1A1A",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.6)",
      tertiary: "rgba(255, 255, 255, 0.4)",
      accent: "#0CC", // Cyan
    },
    border: {
      primary: "#333333",
      secondary: "#444444",
      accent: "#0AA", // Darker cyan
    },
    accent: {
      primary: "#0CC", // Cyan
      secondary: "#6D28D9", // Purple
      tertiary: "#FF6B6B", // Red
    },
    status: {
      success: "#10B981", // Green
      error: "#EF4444", // Red
      warning: "#F59E0B", // Amber
      info: "#3B82F6", // Blue
    },
    priority: {
      high: {
        text: "#F87171", // Red 300
        bg: "#7F1D1D", // Red 900
        border: "#B91C1C", // Red 700
      },
      medium: {
        text: "#FCD34D", // Yellow 300
        bg: "#78350F", // Yellow 900
        border: "#B45309", // Yellow 700
      },
      low: {
        text: "#93C5FD", // Blue 300
        bg: "#1E3A8A", // Blue 900
        border: "#1D4ED8", // Blue 700
      },
    },
  },

  // Light theme colors
  light: {
    background: {
      primary: "#F8F9FA",
      secondary: "#FFFFFF",
      tertiary: "#EDF2F7",
      elevated: "#FFFFFF",
      card: "#FFFFFF",
    },
    text: {
      primary: "#1A202C",
      secondary: "#4A5568",
      tertiary: "#718096",
      accent: "#0099AA",
    },
    border: {
      primary: "#E2E8F0",
      secondary: "#CBD5E0",
      accent: "#0088AA",
    },
    accent: {
      primary: "#0099AA", // Darker cyan for better contrast on light
      secondary: "#6B46C1", // Purple
      tertiary: "#E53E3E", // Red
    },
    status: {
      success: "#059669", // Green
      error: "#DC2626", // Red
      warning: "#D97706", // Amber
      info: "#2563EB", // Blue
    },
    priority: {
      high: {
        text: "#DC2626", // Red 600
        bg: "#FEE2E2", // Red 100
        border: "#FECACA", // Red 200
      },
      medium: {
        text: "#D97706", // Amber 600
        bg: "#FEF3C7", // Amber 100
        border: "#FDE68A", // Amber 200
      },
      low: {
        text: "#2563EB", // Blue 600
        bg: "#DBEAFE", // Blue 100
        border: "#BFDBFE", // Blue 200
      },
    },
  },

  // Cyberpunk theme colors
  cyberpunk: {
    background: {
      primary: "#0D0221", // Deep purple/black
      secondary: "#181830", // Dark blue
      tertiary: "#1A1A2E", // Navy blue
      elevated: "#16213E", // Medium blue
      card: "#0F0F29", // Dark navy
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E4E4F1",
      tertiary: "#AEAED5",
      accent: "#00FFFF", // Bright cyan
    },
    border: {
      primary: "#291D51", // Deep purple
      secondary: "#3A2D6B", // Medium purple
      accent: "#00CCFF", // Bright cyan
    },
    accent: {
      primary: "#00FFFF", // Bright cyan
      secondary: "#FF00FF", // Magenta
      tertiary: "#FFD700", // Gold
    },
    status: {
      success: "#00FF9F", // Neon green
      error: "#FF0055", // Neon red
      warning: "#FFD600", // Bright yellow
      info: "#00BBFF", // Bright blue
    },
    priority: {
      high: {
        text: "#FF0055", // Neon pink
        bg: "#30071E", // Dark pink
        border: "#4F0B2E", // Medium pink
      },
      medium: {
        text: "#FFD600", // Bright yellow
        bg: "#352800", // Dark yellow
        border: "#5C4A00", // Medium yellow
      },
      low: {
        text: "#00BBFF", // Bright blue
        bg: "#002448", // Dark blue
        border: "#003A75", // Medium blue
      },
    },
  },
};

export default colors;
