import { connect, ConnectedProps } from 'react-redux';
import { logout } from '../../state/modules/auth';
import { getChats, changeActiveChatId } from '../../state/modules/chats';
import { RootState } from '../../state/store';
import ChatListScreen from './ChatListScreen';

function mapStateToProps(state: RootState) {
  return {
    status: state.chats.status,
    errorMessage: state.chats.errorMessage,
    user: state.auth.user,
    chats: state.chats.chats,
  };
}

const mapDispatchToProps = {
  getChats,
  logout,
  changeActiveChatId,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ChatListScreenReduxProps = ConnectedProps<typeof connector>;

export default connector(ChatListScreen);
