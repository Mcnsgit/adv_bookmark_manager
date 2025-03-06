/**
 * Spacing configuration for the bookmark manager application
 * Defines consistent spacing values, radius, shadows, and z-indices
 */

const spacing = {
  // Base spacing units (in rem)
  space: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
    56: "14rem", // 224px
    64: "16rem", // 256px
  },

  // Border radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Box shadows
  boxShadow: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",

    // Theme-specific shadows (dark mode)
    "dark-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    "dark-md":
      "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
    "dark-lg":
      "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)",

    // Glow effects
    "glow-cyan": "0 0 15px rgba(0, 204, 204, 0.5)",
    "glow-purple": "0 0 15px rgba(109, 40, 217, 0.5)",
    "glow-magenta": "0 0 15px rgba(255, 0, 255, 0.5)",
  },

  // Z-index layers
  zIndex: {
    auto: "auto",
    0: "0",
    10: "10", // Dropdown level
    20: "20", // Sticky elements
    30: "30", // Fixed elements
    40: "40", // Modal backdrop
    50: "50", // Modal content
    60: "60", // Tooltips and popovers
    70: "70", // Notifications
    max: "9999", // Maximum layer
  },

  // Container max widths
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

export default spacing;
