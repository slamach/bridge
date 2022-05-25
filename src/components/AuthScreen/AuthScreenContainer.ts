import { connect, ConnectedProps } from 'react-redux';
import { login, register } from '../../state/modules/auth';
import AuthScreen from './AuthScreen';

const mapDispatchToProps = {
  login,
  register,
};

const connector = connect(null, mapDispatchToProps);
export type AuthScreenReduxProps = ConnectedProps<typeof connector>;

export default connector(AuthScreen);
