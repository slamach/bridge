import { Platform, StatusBar, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.buttonBackground,
    borderRadius: 15,
  },
  highlightedButton: {
    backgroundColor: colors.highlight,
  },
  marginBottom: {
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
});
