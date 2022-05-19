import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.elementsBackground,
    borderRadius: 15,
  },
  highlightedButton: {
    backgroundColor: colors.highlight,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
});
