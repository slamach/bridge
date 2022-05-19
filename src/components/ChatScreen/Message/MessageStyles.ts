import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
    marginBottom: 5,
  },
  messageContainerSentByUser: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  messageInsideContainer: {
    marginRight: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: colors.elementsBackground,
    borderRadius: 18,
  },
  messageInsideContainerSentByUser: {
    marginRight: 0,
    marginLeft: 5,
    backgroundColor: colors.highlight,
  },
  messageContent: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.41,
    color: colors.text,
  },
  messageTime: {
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: -0.156,
    color: colors.text,
    opacity: 0.5,
  },
});
