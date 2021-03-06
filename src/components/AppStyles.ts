import { Platform, StatusBar, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.background,
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
});
