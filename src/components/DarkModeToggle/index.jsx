import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

// -----------------------------------------------------------

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState("dark");
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => setDarkMode(!darkMode)}>
       Kênh {darkMode ? 'Light' : 'Dark'} Mode
      </Button>
      <p>Đây là một đoạn văn để check màu nền.</p>
    </ThemeProvider>
  );
}

export default DarkModeToggle;