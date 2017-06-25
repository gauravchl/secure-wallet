import { connect } from 'react-redux';
import Wallet from 'components/wallet.jsx'
import { createItem, updateItem, removeItem, encryptItems } from 'actions/wallet';
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
    createItem: (data) => {
      dispatch(createItem(data))
    },
    logout: () => {
      dispatch(encryptItems())
      dispatch(logout())
    },
    updateItem: (updatedItem) => {
      dispatch(updateItem(updatedItem))
    },
    removeItem: (id) => {
      dispatch(removeItem(id))
    }
  }
}



const WalletContainer = connect(mapStateToProps, mapDispatchToProps)(Wallet);
export default WalletContainer;
