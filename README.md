# React Native StyleKit

A lightweight, theme-based styling system for React Native and Expo applications.

## Installation

```bash
npm install react-native-stylekit
# or
yarn add react-native-stylekit
```

## Features

- Theme-based styling with light/dark mode support
- Shorthand prop-based styling similar to Chakra UI or Styled System
- Built-in components with theme awareness
- TypeScript support
- Small bundle size

## Basic Usage

```jsx
import { ThemeProvider, Box, Text } from 'react-native-stylekit';

export default function App() {
  return (
    <ThemeProvider>
      <Box flex={1} bg="background" p="md">
        <Text fontSize="lg" fontWeight="bold" color="primary">
          Hello, StyleKit!
        </Text>
        <Box 
          mt="md" 
          p="md" 
          bg="surface" 
          borderRadius="md"
          flexDir="row"
          align="center"
        >
          <Text>Styled components with theme support</Text>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
```

## Customizing the Theme

```jsx
import { ThemeProvider, createTheme } from 'react-native-stylekit';

// Override default theme
const myTheme = createTheme({
  colors: {
    light: {
      primary: '#6200ee',
      // ... other colors
    },
    dark: {
      primary: '#bb86fc',
      // ... other colors
    }
  },
  // ... other theme values
});

export default function App() {
  return (
    <ThemeProvider theme={myTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Using Hooks

```jsx
import { useStyleTokens, useTheme, useColorScheme } from 'react-native-stylekit';
import { View, Text } from 'react-native';

function MyComponent() {
  // Get the current theme
  const theme = useTheme();
  
  // Get the current color scheme (light/dark)
  const colorScheme = useColorScheme();
  
  // Create styles using theme tokens
  const containerStyle = useStyleTokens({
    p: 'md',
    bg: 'surface',
    borderRadius: 'md',
    flexDir: 'row',
  });
  
  return (
    <View style={containerStyle}>
      <Text style={{ color: theme.colors[colorScheme].primary }}>
        Custom styling with hooks
      </Text>
    </View>
  );
}
```

## Available Props

The Box component supports all these props for styling:

### Layout
- `w` - width
- `h` - height
- `minW` - min width
- `maxW` - max width
- `minH` - min height
- `maxH` - max height
- `pos` - position
- `top`, `right`, `bottom`, `left` - position values
- `z` - z-index

### Spacing
- `m` - margin
- `mt`, `mr`, `mb`, `ml` - margin top, right, bottom, left
- `mx`, `my` - margin horizontal, vertical
- `p` - padding
- `pt`, `pr`, `pb`, `pl` - padding top, right, bottom, left
- `px`, `py` - padding horizontal, vertical

### Flexbox
- `flex` - flex value
- `flexDir` - flex direction
- `align` - align items
- `justify` - justify content
- `wrap` - flex wrap
- `flexGrow`, `flexShrink`, `flexBasis` - flex properties
- `alignSelf` - align self

### Visual
- `opacity` - opacity
- `display` - display
- `bg` - background color
- `borderRadius` - border radius
- `lightBg`, `darkBg` - theme-specific backgrounds

## License
