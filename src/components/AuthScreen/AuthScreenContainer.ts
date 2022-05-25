import { connect, ConnectedProps } from 'react-redux';
import { login, register } from '../../state/modules/auth';
import { RootState } from '../../state/store';
import AuthScreen from './AuthScreen';

function mapStateToProps(state: RootState) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

const mapDispatchToProps = {
  login,
  register,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type AuthScreenReduxProps = ConnectedProps<typeof connector>;

export default connector(AuthScreen);
