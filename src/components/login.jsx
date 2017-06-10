import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Login = (props) => {

  return (
    <div style={styles.root}>
      <RaisedButton style={styles.btn} label='Login' primary fullWidth={true} />
    </div>
  )

}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    maxWidth: '400px',
    minWidth: '400px'
  }

}
export default Login
