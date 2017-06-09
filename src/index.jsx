import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  render () {
    return <p>Secure wallet v0.0.0.2</p>;
  }
}

render(<App/>, document.getElementById('app'));
