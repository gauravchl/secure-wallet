import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  render () {
    return <p>Secure wallet v18</p>;
  }
}

render(<App/>, document.getElementById('app'));
