import { connect } from 'react-redux';
import Wallet from 'components/wallet.jsx'
import { createItem, updateItem } from 'actions/wallet'

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
  }
}



const WalletContainer = connect(mapStateToProps, mapDispatchToProps)(Wallet);
export default WalletContainer;
