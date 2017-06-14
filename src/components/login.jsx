import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { pink400, grey800 } from 'material-ui/styles/colors';
import LockIcon from 'material-ui/svg-icons/action/lock';
import Logo from 'components/logo.jsx';



class Login extends React.Component {
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
  }

  handleLoginClick() {
    let { onLoginClick, onCreateLoginClick, login } = this.props;
    if (login && login.masterKey) {
      onLoginClick(this._tf.getValue())
    } else {
      onCreateLoginClick(this._tf.getValue())
    }
  }

  handlePressEnter(e) {
    if (e.key === 'Enter') {
      this.handleLoginClick()
    }
  }

  render() {
    let { onLoginClick, onCreateLoginClick, login={}} = this.props;
    let { masterKey, local } = login;

    return (
      <div style={styles.root}>
        <div style={styles.loginBox}>
          <Logo style={styles.logo}/>
          <span style={styles.text}>Secure Wallet</span>
          <TextField ref={(ref) => this._tf = ref}
            style={styles.field}
            errorText={local && local.error}
            onKeyPress={this.handlePressEnter}
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
    paddingTop: '12vh',
  },
  logo: {
    width: '130px',
    height: '130px',
    marginBottom: '18px',
  },
  text: {
    fontSize: '24px',
    fontWeight: '300',
    marginBottom: '52px',
    color: grey800,
  }
}
export default Login
