import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme();

type ThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * ThemeProvider is a React component that provides a default MUI theme to its child components.
 * It utilizes Material-UI's `createTheme` to establish a default theme, and the `MuiThemeProvider`
 * component to apply this theme across all child components. Additionally, it includes the `CssBaseline`
 * component to ensure consistent baseline CSS across the application.
 *
 * @param {object} props - The properties passed to the ThemeProvider component.
 * @param {React.ReactNode} props.children - The child components that will receive the theme.
 * @returns {React.ReactElement} A React element that provides the default MUI theme to its children.
 *
 * @example
 * // To use ThemeProvider, wrap it around your component hierarchy:
 * <ThemeProvider>
 *   <YourComponent />
 * </ThemeProvider>
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
