import { connect } from 'react-redux';
import Wallet from 'components/wallet.jsx'
import { createItem, updateItem, encryptItems } from 'actions/wallet';
import { logout } from 'actions/login';

const mapStateToProps = (state) => {
  return {
    items: state.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAddItem: (data) => {
      dispatch(createItem(data))
    },
    onClickLogout: () => {
      dispatch(encryptItems())
      dispatch(logout())
    }
  }
}



const WalletContainer = connect(mapStateToProps, mapDispatchToProps)(Wallet);
export default WalletContainer;
