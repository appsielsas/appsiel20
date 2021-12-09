import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import App from './App';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const properties = {
  MuiButton: {
    size: 'medium',
  },
  MuiButtonGroup: {
    size: 'small',
  },
  MuiCheckbox: {
    size: 'small',
  },
  MuiFab: {
    size: 'small',
  },
  MuiFormControl: {
    margin: 'dense',
    size: 'small',
  },
  MuiFormHelperText: {
    margin: 'dense',
  },
  MuiIconButton: {
    size: 'small',
  },
  MuiInputBase: {
    margin: 'dense',
  },
  MuiInputLabel: {
    margin: 'dense',
  },
  MuiRadio: {
    size: 'small',
  },
  MuiSwitch: {
    size: 'small',
  },
  MuiTextField: {
    margin: 'dense',
    size: 'small',
  },
  MuiAppBar: {
    color: 'primary',
  },
}




const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#574696',
        },
        secondary: {
          main: '#50B794',
        },
        background: {
          default: '#fafafa',
        }
      }
      : {
        // palette values for dark mode
        primary: {
          main: '#42A3DC',
        },
        secondary: {
          main: '#50B794',
        },
        background: {
          default: '#303030',
        }
      }),
  },
  props: {
    MuiButton: {
      size: 'medium',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiAppBar: {
      color: 'primary',
    },
  }
});

export default function CustomStyles(props) {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App>

        </App>
      </ThemeProvider>
    </ColorModeContext.Provider >

  );
}