import { connect } from 'react-redux';
import Login from 'components/login.jsx'
import { login, createLogin, updateLogin } from 'actions/login'

const mapStateToProps = (state) => {
  return {
    items: state.items || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => {
      dispatch(login(masterKey))
    },

    onCreateLoginClick: () => {
      dispatch(createLogin(masterKey))
    }
  }
}



const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;
