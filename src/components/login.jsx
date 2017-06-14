import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { pink400, grey200, grey800 } from 'material-ui/styles/colors';
import LockIcon from 'material-ui/svg-icons/action/lock';



class Login extends React.Component {
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    let { onLoginClick, onCreateLoginClick, login } = this.props;
    if (login && login.masterKey) {
      onLoginClick(this._tf.getValue())
    } else {
      onCreateLoginClick(this._tf.getValue())
    }
  }

  render() {
    let { onLoginClick, onCreateLoginClick, login={}} = this.props;
    let { masterKey, local } = login;

    return (
      <div style={styles.root}>
        <div style={styles.loginBox}>
          <div style={styles.logo}>
            <LockIcon style={styles.logo.icon}/>
            <span>Secure Wallet</span>
          </div>
          <TextField ref={(ref) => this._tf = ref}
            style={styles.field}
            errorText={local && local.error}
            floatingLabelText="Master key"
            type="password" fullWidth={true}
          />
          <br/>
          <br/>
          <RaisedButton style={styles.field}
            onTouchTap={this.handleLoginClick}
            label={ masterKey ? 'Login' : 'Add master key to start'}
            primary fullWidth={true}
            />
        </div>
      </div>
    )
  }
}



const styles = {
  root: {
    height: '100vh',
    padding: '0 18px',
  },
  field: {
    maxWidth: '400px',
    minWidth: 'auto',
    width: '80%'
  },
  loginBox:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '12vh',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: '300',
    marginBottom: '52px',
    color: grey800,
    icon: {
      width: 82,
      height: 82,
      marginBottom: '18px',
      padding: 24,
      color: 'inherit',
      background: grey200,
      borderRadius: '50%',
    }
  },
}
export default Login
