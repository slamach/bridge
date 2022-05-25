import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

export const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8.5,
    paddingRight: 37,
  },
  chatName: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '500',
    letterSpacing: -0.416,
    color: colors.text,
  },
  lastMessage: {
    fontSize: 14.5,
    lineHeight: 21,
    letterSpacing: -0.156,
    color: colors.text,
    opacity: 0.5,
  },
  chatTime: {
    position: 'absolute',
    top: 18,
    right: 0,
    fontSize: 14.5,
    lineHeight: 21,
    letterSpacing: -0.156,
    color: colors.text,
    opacity: 0.5,
  },
  avatarMarginRight: {
    marginRight: 11,
  },
});
