import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontFamily: ['Poppins']
  },
  
  palette: {
    primary: {
      contrastText: '#FFFFFF',
      dark: '#007B86',
      light: '#63C9D3',
      main: '#00024A',
      50: '#E6E9F8',
      100: '#AFFFFF',
      200: '#8CE3ED',
      300: '#63C9D3',
      400: '#42B6C2',
      500: '#00A1AE',
      600: '#00919C',
      700: '#007B86',
      800: '#006671',
      900: '#004F5A'
    },
    secondary: {
      contrastText: '#FFFFFF',
      dark: '#E04F00',
      light: '#FFA550',
      main: '#FF6C02',
      50: '#FFFFB1',
      100: '#FFEE9A',
      200: '#FFC878',
      300: '#FFA550',
      400: '#FF8A32',
      500: '#FF6C02',
      600: '#F36003',
      700: '#E04F00',
      800: '#D43A01',
      900: '#C32100'
    },
    grey: {
      main: '#00024A'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        size: 'large'
      },
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: '500',
          fontSize: '16px',
          textTransform: 'none'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium',
        variant: 'outlined',
        autoComplete: 'off',
        InputProps: {
          sx: {
            borderRadius: '12px'
          }
        }
      },
      styleOverrides: {
        root: {
          borderRadius: '12px'
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        size: 'medium',
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          borderRadius: '12px'
        }
      }
    }
  }
})
