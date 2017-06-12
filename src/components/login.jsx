import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Login = (props) => {
  let { onLoginClick, onCreateLoginClick, login } = props;
  let hasMasterKey = login && login.masterKey;

  return (
    <div style={styles.root}>
      <TextField style={styles.field} hintText="Master key" floatingLabelText="Master key" type="password" fullWidth={true}/>
      <br/>
      <br/>
      <RaisedButton style={styles.field}
        onTouchTap={hasMasterKey ? onLoginClick : onCreateLoginClick}
        label={hasMasterKey ? 'Login' : 'Add master key to start'}
        primary fullWidth={true}
      />
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
  field: {
    maxWidth: '400px',
    minWidth: 'auto',
    width: '80%'
  }

}
export default Login
