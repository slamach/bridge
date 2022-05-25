import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../state/store';
import { initAuth } from '../state/modules/app';
import App from './App';

function mapStateToProps(state: RootState) {
  return {
    status: state.app.status,
    user: state.auth.user,
  };
}

const mapDispatchToProps = {
  initAuth,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type AppReduxProps = ConnectedProps<typeof connector>;

export default connector(App);
