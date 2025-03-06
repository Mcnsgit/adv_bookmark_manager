/**
 * Typography configuration for the bookmark manager application
 * Defines font families, sizes, weights, and line heights
 */

const typography = {
  // Font families
  fontFamily: {
    base: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', monospace",
    cyber: "'Rajdhani', 'Inter', sans-serif", // Special font for cyberpunk theme
  },

  // Font sizes
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  // Text styles for different purposes
  textStyles: {
    // Headings
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },

    // Body text
    body: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodyLarge: {
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    // Special text styles
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.01em",
    },
    code: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.9rem",
      lineHeight: 1.6,
    },
  },
};

export default typography;
