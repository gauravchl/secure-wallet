import { connect } from 'react-redux';
import Login from 'components/login.jsx'
import { login, createLogin, updateLogin } from 'actions/login'

const mapStateToProps = (state) => {
  return {
    login: state.login || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (masterKey) => {
      dispatch(login(masterKey))
    },

    onCreateLoginClick: (masterKey) => {
      dispatch(createLogin(masterKey))
    }
  }
}



const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;
