export const theme = {
  colors: {
    background: "#F2F5FB",
    surface: "#FFFFFF",
    surfaceSoft: "#E8EEF7",
    border: "#C9D5E5",
    textPrimary: "#1D2B3C",
    textSecondary: "#64748B",
    primary: "#0B8F64",
    primaryDark: "#086449",
    tertiary: "#34D399",
    danger: "#DC2626",
    warning: "#F97316",
    mutedIcon: "#4B5563"
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
    pill: 999
  },
  typography: {
    headline: 30,
    title: 32,
    section: 34,
    body: 14,
    caption: 12,
    button: 15
  }
} as const;

export type Theme = typeof theme;
