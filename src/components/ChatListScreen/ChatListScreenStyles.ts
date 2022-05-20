import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  chatsContainer: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 17,
  },
  chatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatsTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.text,
  },
  chatList: {
    flex: 1,
  },
});