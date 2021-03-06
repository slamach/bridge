import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 23,
    paddingVertical: 75,
  },
  logo: {
    marginBottom: 90,
  },
  authText: {
    marginBottom: 30,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '600',
    color: colors.text,
  },
  errorMessage: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500',
    color: colors.text,
  },
});
