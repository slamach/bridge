import { connect, ConnectedProps } from 'react-redux';
import { setUser } from '../../state/modules/app';
import { RootState } from '../../state/store';
import ChatListScreen from './ChatListScreen';

function mapStateToProps(state: RootState) {
  return {
    user: state.app.user,
    chats: state.app.chats,
  };
}

const mapDispatchToProps = {
  setUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ChatListScreenReduxProps = ConnectedProps<typeof connector>;

export default connector(ChatListScreen);
