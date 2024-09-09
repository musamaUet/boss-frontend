/* eslint-disable import/no-unresolved */
import { alpha } from '@mui/material/styles';
import styles from './scss/core/_palette.module.scss';
// ----------------------------------------------------------------------

// Extract SCSS variables

const colors = {
  primary: {
    lighter: styles.primaryLighter,
    light: styles.primaryLight,
    main: styles.primaryMain,
    dark: styles.primaryDark,
    darker: styles.primaryDarker,
    contrastText: styles.primaryContrast,
  },
  secondary: {
    lighter: styles.secondaryLighter,
    light: styles.secondaryLight,
    main: styles.secondaryMain,
    dark: styles.secondaryDark,
    darker: styles.secondaryDarker,
    contrastText: styles.secondaryContrast,
  },
  info: {
    lighter: styles.infoLighter,
    light: styles.infoLight,
    main: styles.infoMain,
    dark: styles.infoDark,
    darker: styles.infoDarker,
    contrastText: styles.infoContrast,
  },
  success: {
    lighter: styles.successLighter,
    light: styles.successLight,
    main: styles.successMain,
    dark: styles.successDark,
    darker: styles.successDarker,
    contrastText: styles.successContrast,
  },
  warning: {
    lighter: styles.warningLighter,
    light: styles.warningLight,
    main: styles.warningMain,
    dark: styles.warningDark,
    darker: styles.warningDarker,
    contrastText: styles.warningContrast,
  },
  error: {
    lighter: styles.errorLighter,
    light: styles.errorLight,
    main: styles.errorMain,
    dark: styles.errorDark,
    darker: styles.errorDarker,
    contrastText: styles.errorContrast,
  },
};

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: colors.primary.lighter,
  light: colors.primary.light,
  main: colors.primary.main,
  dark: colors.primary.dark,
  darker: colors.primary.darker,
  contrastText: colors.primary.contrastText,
};

const SECONDARY = {
  lighter: colors.secondary.lighter,
  light: colors.secondary.light,
  main: colors.secondary.main,
  dark: colors.secondary.dark,
  darker: colors.secondary.darker,
  contrastText: colors.secondary.contrastText,
};

const INFO = {
  lighter: colors.info.lighter,
  light: colors.info.light,
  main: colors.info.main,
  dark: colors.info.dark,
  darker: colors.info.darker,
  contrastText: colors.info.contrastText,
};

const SUCCESS = {
  lighter: colors.success.lighter,
  light: colors.success.light,
  main: colors.success.main,
  dark: colors.success.dark,
  darker: colors.success.darker,
  contrastText: colors.success.contrastText,
};

const WARNING = {
  lighter: colors.warning.lighter,
  light: colors.warning.light,
  main: colors.warning.main,
  dark: colors.warning.dark,
  darker: colors.warning.darker,
  contrastText: GREY[800],
};

const ERROR = {
  lighter: colors.error.lighter,
  light: colors.error.light,
  main: colors.error.main,
  dark: colors.error.dark,
  darker: colors.error.darker,
  contrastText: colors.error.contrastText,
};
// const PRIMARY = {
//   lighter: '#C8FAD6',
//   light: '#5BE49B',
//   main: '#00A76F',
//   dark: '#007867',
//   darker: '#004B50',
//   contrastText: '#FFFFFF',
// };

// const SECONDARY = {
//   lighter: '#EFD6FF',
//   light: '#C684FF',
//   main: '#8E33FF',
//   dark: '#5119B7',
//   darker: '#27097A',
//   contrastText: '#FFFFFF',
// };

// const INFO = {
//   lighter: '#CAFDF5',
//   light: '#61F3F3',
//   main: '#00B8D9',
//   dark: '#006C9C',
//   darker: '#003768',
//   contrastText: '#FFFFFF',
// };

// const SUCCESS = {
//   lighter: '#D3FCD2',
//   light: '#77ED8B',
//   main: '#22C55E',
//   dark: '#118D57',
//   darker: '#065E49',
//   contrastText: '#ffffff',
// };

// const WARNING = {
//   lighter: '#FFF5CC',
//   light: '#FFD666',
//   main: '#FFAB00',
//   dark: '#B76E00',
//   darker: '#7A4100',
//   contrastText: GREY[800],
// };

// const ERROR = {
//   lighter: '#FFE9D5',
//   light: '#FFAC82',
//   main: '#FF5630',
//   dark: '#B71D18',
//   darker: '#7A0916',
//   contrastText: '#FFFFFF',
// };

const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode) {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === 'light' ? light : dark;
}
