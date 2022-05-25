import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: colors.elementsBackground,
    borderRadius: 20,
  },
  avatarContent: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
