/* eslint-disable no-unused-vars */
import React from 'react'
import { createTheme, SimplePaletteColorOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {

    interface Palette {
        paper: SimplePaletteColorOptions
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        futura?: React.CSSProperties
        inter?: React.CSSProperties
        shCaption?: React.CSSProperties
        shHeading?: React.CSSProperties
        shSubtitle?: React.CSSProperties
    }

    interface PaletteOptions {
        paper?: SimplePaletteColorOptions
    }
  }

  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        futura: true
        inter: true
        shCaption: true
        shHeading: true
        shSubtitle: true
    }
  }

const theme = createTheme({
  typography: {
    shCaption: {
      fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: 16,
      fontWeight: 500,
      color: '#646464'
    },
    futura: {
      fontFamily: 'futura-pt, "Helvetica Neue", Helvetica, Arial, sans-serif'
    },
    inter: {
      fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif'
    }
  },
  palette: {
    primary: {
      main: '#37D9BD'
    },
    secondary: {
      main: '#fcaf17'
    },
    error: {
      main: '#d32f2f'
    },
    paper: {
      main: '#f8f8f8',
      dark: '#ececec'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif'
        }
      },
      defaultProps: {
        variantMapping: {
          shCaption: 'h6',
          futura: 'h4'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif!important',
          // backgroundColor: '#fff!important',
          color: 'black!important',
          // transition: '0.7s ease',
          '&.Mui-selected': {
            backgroundColor: 'grey!important',
            color: '#fff!important',
            transition: '0.7s ease'
          }
          // '&:hover': {
          //   backgroundColor: 'grey!important',
          //   color: '#fff!important',
          //   transition: '0.7s ease'
          // }
        }
      }
    }
  }
})

export default theme
