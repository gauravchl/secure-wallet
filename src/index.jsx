import React from 'react';
import { render } from 'react-dom';
import store from 'store.js';
import { StyleRoot } from 'radium';
import { Provider, connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Theme from 'theme.js'
import { decryptItems } from 'actions/wallet';
import LoginContainer from 'containers/login.jsx'
import WalletContainer from 'containers/wallet.jsx'


injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    let { login={}, wallet={}, dispatch } = this.props;
    let { loggedIn } = login.local || {};
    let { decrypted } = wallet.local || {};
    if (loggedIn && !decrypted) {
      setTimeout(() => dispatch(decryptItems()), 1)
      // TODO - show decryptin...
      return null;
    }

    return (
      <StyleRoot>
        <MuiThemeProvider muiTheme={Theme}>
          { loggedIn
            ? <WalletContainer />
            : <LoginContainer />
          }
        </MuiThemeProvider>
      </StyleRoot>
    )
  }
}

let AppContainer = connect((state) => state)(App)
render(<Provider store={store}><AppContainer/></Provider>, document.getElementById('app'));
