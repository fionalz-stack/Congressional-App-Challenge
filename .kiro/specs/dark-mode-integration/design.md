# Dark Mode Integration Design

## Overview

This design document outlines the implementation of comprehensive dark mode support for the Transit app, building upon the existing DarkModeContext. The solution integrates with Gluestack UI's theming system to provide seamless theme switching while maintaining the app's white/purple color palette in both light and dark variants.

## Architecture

### Theme System Architecture

```
App Root
├── DarkModeProvider (Enhanced)
│   ├── Theme Configuration
│   ├── Color Palette Management
│   └── Persistence Layer
├── GluestackUIProvider (Configured)
│   ├── Light Theme Config
│   ├── Dark Theme Config
│   └── Dynamic Theme Switching
└── App Components
    ├── Themed Components
    ├── Custom UI Components
    └── Screen Components
```

### Integration Points

1. **Enhanced DarkModeContext**: Extends existing context with theme configuration
2. **Gluestack UI Theme Provider**: Configures component-level theming
3. **Color System**: Centralized color palette with light/dark variants
4. **Component Integration**: Automatic theme application across all components

## Components and Interfaces

### Enhanced DarkModeContext Interface

```typescript
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
  theme: ThemeConfig;
  colors: ColorPalette;
}

interface ThemeConfig {
  mode: 'light' | 'dark';
  colors: ColorPalette;
  spacing: SpacingConfig;
  typography: TypographyConfig;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
}
```

### Gluestack UI Theme Configuration

```typescript
interface GluestackThemeConfig {
  tokens: {
    colors: {
      light: ColorTokens;
      dark: ColorTokens;
    };
  };
  components: ComponentThemes;
}
```

### Theme Provider Component

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps>
```

## Data Models

### Color Palette System

**Light Theme Colors:**
```typescript
const lightColors = {
  primary: '#8B5CF6',      // Purple-500
  secondary: '#A78BFA',    // Purple-400
  background: '#FFFFFF',   // White
  surface: '#F8FAFC',      // Slate-50
  text: '#1E293B',         // Slate-800
  textSecondary: '#64748B', // Slate-500
  border: '#E2E8F0',       // Slate-200
  accent: '#C084FC',       // Purple-300
}
```

**Dark Theme Colors:**
```typescript
const darkColors = {
  primary: '#A78BFA',      // Purple-400 (lighter for dark bg)
  secondary: '#8B5CF6',    // Purple-500
  background: '#0F172A',   // Slate-900
  surface: '#1E293B',      // Slate-800
  text: '#F1F5F9',         // Slate-100
  textSecondary: '#94A3B8', // Slate-400
  border: '#334155',       // Slate-700
  accent: '#C084FC',       // Purple-300
}
```

### Theme Configuration Model

```typescript
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemePreference {
  mode: ThemeMode;
  lastUpdated: string;
  systemOverride: boolean;
}
```

## Error Handling

### Theme Loading Errors
- Graceful fallback to system theme if stored preference is corrupted
- Default to light theme if system theme detection fails
- Error logging for theme persistence failures

### Component Rendering Errors
- Fallback colors for components that fail to load theme
- Error boundaries around theme-dependent components
- Graceful degradation for unsupported theme features

### Storage Errors
- Handle AsyncStorage failures gracefully
- Retry mechanism for theme preference persistence
- In-memory fallback when storage is unavailable

## Testing Strategy

### Unit Tests
- Theme context functionality
- Color palette generation
- Theme switching logic
- Persistence layer operations

### Integration Tests
- Gluestack UI component theming
- Theme provider integration
- System theme detection
- Cross-component theme consistency

### Visual Tests
- Screenshot testing for light/dark themes
- Contrast ratio validation
- Component appearance verification
- Animation and transition testing

### Accessibility Tests
- Color contrast compliance (WCAG AA)
- Screen reader compatibility
- Focus indicator visibility
- Theme change announcements

## Implementation Approach

### Phase 1: Enhanced Theme System
1. Extend existing DarkModeContext with theme configuration
2. Create centralized color palette system
3. Implement theme persistence enhancements
4. Add TypeScript interfaces for theme system

### Phase 2: Gluestack UI Integration
1. Configure Gluestack UI theme provider
2. Create theme-aware component wrappers
3. Implement automatic theme switching
4. Add theme configuration utilities

### Phase 3: Component Integration
1. Update existing components to use theme system
2. Create theme-aware custom components
3. Implement smooth theme transitions
4. Add theme toggle UI components

### Phase 4: Testing and Polish
1. Implement comprehensive test suite
2. Validate accessibility compliance
3. Performance optimization
4. Documentation and examples

## Performance Considerations

### Theme Switching Performance
- Minimize re-renders during theme changes
- Use React.memo for theme-stable components
- Implement efficient color calculation
- Cache theme configurations

### Memory Management
- Lazy load theme configurations
- Efficient color palette storage
- Cleanup theme listeners on unmount
- Optimize AsyncStorage operations

### Bundle Size Impact
- Tree-shake unused theme utilities
- Minimize color palette duplication
- Efficient theme configuration structure
- Optimize import statements