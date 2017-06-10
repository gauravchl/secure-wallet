import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducers from 'reducers.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Theme from 'theme.js'
import LoginContainer from 'containers/login.jsx'


injectTapEventPlugin();
let store = createStore(Reducers)


class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={Theme}>
        <Provider store={store}>
          <LoginContainer />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

render(<App/>, document.getElementById('app'));
