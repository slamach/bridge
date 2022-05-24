import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../state/store';
import { setUser } from '../state/modules/app';
import App from './App';

function mapStateToProps(state: RootState) {
  return {
    user: state.app.user,
  };
}

const connector = connect(mapStateToProps);
export type AppReduxProps = ConnectedProps<typeof connector>;

export default connector(App);
