import { DarkTheme } from '@react-navigation/native';
import colors from './colors';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.highlight,
    background: colors.background,
  },
};

export default navigationTheme;
