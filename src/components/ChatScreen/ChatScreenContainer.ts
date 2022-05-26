import { connect, ConnectedProps } from 'react-redux';
import {
  changeActiveChatId,
  clearActiveChatId,
  getMessages,
  initiateMessageSending,
} from '../../state/modules/messages';
import { RootState } from '../../state/store';
import ChatScreen from './ChatScreen';

function mapStateToProps(state: RootState) {
  return {
    status: state.messages.status,
    messages: state.messages.messages,
  };
}

const mapDispatchToProps = {
  changeActiveChatId,
  clearActiveChatId,
  getMessages,
  initiateMessageSending,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ChatScreenReduxProps = ConnectedProps<typeof connector>;

export default connector(ChatScreen);
