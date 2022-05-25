import { connect, ConnectedProps } from 'react-redux';
import { initAuth, login, register } from '../../state/modules/app';
import AuthScreen from './AuthScreen';

const mapDispatchToProps = {
  initAuth,
  login,
  register,
};

const connector = connect(null, mapDispatchToProps);
export type AuthScreenReduxProps = ConnectedProps<typeof connector>;

export default connector(AuthScreen);
