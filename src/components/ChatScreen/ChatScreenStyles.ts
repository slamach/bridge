import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 17,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  chatHeaderBackground: {
    position: 'absolute',
    left: '-10%',
    bottom: 0,
    zIndex: -2,
    width: '120%',
    height: 160,
    backgroundColor: colors.secondaryBackground,
  },
  chatTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '500',
    letterSpacing: -0.416,
    color: colors.text,
  },
  messageList: {
    flex: 1,
    paddingVertical: 17,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 60,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    backgroundColor: colors.highlight,
    borderRadius: 18,
  },
  chatFooterBackground: {
    position: 'absolute',
    left: '-10%',
    top: 0,
    zIndex: -2,
    width: '120%',
    height: 160,
    backgroundColor: colors.secondaryBackground,
  },
});
