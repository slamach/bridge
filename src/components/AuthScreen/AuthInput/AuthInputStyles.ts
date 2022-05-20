import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  authInput: {
    width: '100%',
    padding: 14,
    fontSize: 15,
    lineHeight: 18,
    color: colors.text,
    backgroundColor: colors.formInputBackground,
  },
  authInputRadiusTop: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  authInputRadiusBottom: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
});
