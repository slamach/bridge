import { connect, ConnectedProps } from 'react-redux';
import { setUser } from '../../state/modules/app';
import AuthScreen from './AuthScreen';

const mapDispatchToProps = {
  setUser,
};

const connector = connect(null, mapDispatchToProps);
export type AuthScreenReduxProps = ConnectedProps<typeof connector>;

export default connector(AuthScreen);
