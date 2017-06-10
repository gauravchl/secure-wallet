import { connect } from 'react-redux';
import Login from 'components/login.jsx'
import { createItem } from 'actions.js'

const mapStateToProps = (state) => {
  return {
    items: state.items || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => {
      dispatch(createItem())
    }
  }
}



const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;
