import { connect, ConnectedProps } from 'react-redux';
import { clearActiveChatId } from '../../state/modules/chats';
import ChatScreen from './ChatScreen';

const mapDispatchToProps = {
  clearActiveChatId,
};

const connector = connect(null, mapDispatchToProps);
export type ChatScreenReduxProps = ConnectedProps<typeof connector>;

export default connector(ChatScreen);
