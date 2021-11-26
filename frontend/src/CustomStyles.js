import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { console.log('object') } });

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
    color: 'transparent',
  },
}

const themeDark = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#42A3DC',
    },
    secondary: {
      main: '#50B794',
    },
    background: {
      default: '#303030',
    }

  },
  shape: {
    borderRadius: 20,
  },
  props: properties,
  spacing: 8,
});

const themeLight = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#574696',
    },
    secondary: {
      main: '#50B794',
    },
    background: {
      default: '#fafafa',
    }
  },
  props: properties,
  spacing: 8,
});



export default function CustomStyles(props) {

  const [mode, setMode] = React.useState('light');
  console.log('1')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const themeF = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themeLight}>
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider >

  );
}