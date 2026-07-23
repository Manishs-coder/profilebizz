/**
 * Design tokens synced from profilebizz sibling artifact (index.css)
 * HSL → hex conversions from the web palette.
 */
const colors = {
  light: {
    text: '#000000',
    tint: '#e50b16',

    background: '#fafafa',
    foreground: '#000000',

    card: '#ffffff',
    cardForeground: '#000000',

    primary: '#0f0f0f',
    primaryForeground: '#ffffff',

    secondary: '#f5f5f5',
    secondaryForeground: '#0f0f0f',

    muted: '#f5f5f5',
    mutedForeground: '#545454',

    accent: '#f5f5f5',
    accentForeground: '#0f0f0f',

    destructive: '#e50b16',
    destructiveForeground: '#ffffff',

    border: '#e3e3e3',
    input: '#e3e3e3',

    // Brand colours from profilebizz
    editorial: '#e50b16',   // hsl(357,91%,47%) — brand red
    authority: '#002747',   // hsl(205,100%,14%) — brand navy

    published: '#16a34a',
    publishedBg: '#f0fdf4',
    draft: '#b45309',
    draftBg: '#fffbeb',
  },

  dark: {
    text: '#fafafa',
    tint: '#e50b16',

    background: '#0a0a0a',
    foreground: '#fafafa',

    card: '#111111',
    cardForeground: '#fafafa',

    primary: '#fafafa',
    primaryForeground: '#0a0a0a',

    secondary: '#1a1a1a',
    secondaryForeground: '#fafafa',

    muted: '#1a1a1a',
    mutedForeground: '#999999',

    accent: '#1a1a1a',
    accentForeground: '#fafafa',

    destructive: '#e50b16',
    destructiveForeground: '#ffffff',

    border: '#262626',
    input: '#262626',

    editorial: '#ff2d3b',
    authority: '#1a4a7a',

    published: '#4ade80',
    publishedBg: '#052e16',
    draft: '#fbbf24',
    draftBg: '#1c1407',
  },

  radius: 8,
};

export default colors;
