import { connect } from 'react-redux';
import Wallet from 'components/wallet.jsx'
import { createItem, updateItem, encryptItems } from 'actions/wallet';
import { logout } from 'actions/login';

const mapStateToProps = (state) => {
  let { wallet } = state;
  let items = wallet.local && wallet.local.decrypted && wallet.items || []
  return {
    items: items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateItem: (data) => {
      dispatch(createItem(data))
    },
    onClickLogout: () => {
      dispatch(encryptItems())
      dispatch(logout())
    },
    onUpdateItem: (updatedItem) => {
      dispatch(updateItem(updatedItem))
    }
  }
}



const WalletContainer = connect(mapStateToProps, mapDispatchToProps)(Wallet);
export default WalletContainer;
