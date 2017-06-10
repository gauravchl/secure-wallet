import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { createItem } from 'actions.js'

const Login = (props) => {
  let { onLoginClick, items } = props;
  return (
    <div style={styles.root}>
      <RaisedButton onTouchTap={onLoginClick} style={styles.btn} label='Login' primary fullWidth={true} />
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
    minWidth: 'auto',
    width: '80%'
  }

}
export default Login
