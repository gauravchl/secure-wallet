import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from './theme.js'
import Login from './components/login.jsx'

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={Theme}>
        <Login />
      </MuiThemeProvider>
    )
  }
}

render(<App/>, document.getElementById('app'));
