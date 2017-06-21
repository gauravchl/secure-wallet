import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Logo from 'components/logo.jsx';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import WalletItem from 'components/wallet-item.jsx';
import { grey50, grey200 } from 'material-ui/styles/colors';

class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.state = { currentItem: null };
    this.renderDrawer = this.renderDrawer.bind(this);
  }


  renderDrawer() {
    let { items=[]} = this.props;
    let { currentItem } = this.state;
    let style = { backgroundColor: grey200 };
    let drawerItems = items.map((item, index) => {
      return (
        <MenuItem
          style={item._id === currentItem ? style : {}}
          onTouchTap={() => this.setState({ currentItem: item._id })}
          key={index}>
          {item.title}
        </MenuItem>
      )
    })
    return (
      <Drawer containerStyle={styles.drawer} open={true} docked={true}>
        {drawerItems}
      </Drawer>
    )
  }


  renderWalletItem() {
    let { items=[]} = this.props;
    let { currentItem } = this.state;
    let item = items.find(item => item._id === currentItem)
    if (!item) item = items.length ? items[0] : null
    return <WalletItem item={item}/>
  }


  render() {
    let { onClickAddItem, onClickLogout, items=[]} = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.topBar}>
          <Logo style={styles.topBar.logo} />
          <FlatButton onTouchTap={onClickLogout} label='logout' style={{ marginLeft: 'auto' }} />
        </div>
        {this.renderDrawer()}
        {this.renderWalletItem()}
        <FloatingActionButton style={styles.addBtn} onTouchTap={onClickAddItem}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}


Wallet.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onClickAddItem: PropTypes.func,
  onClickLogout: PropTypes.func
}


const styles = {
  root: {
    height: '100vh',
  },
  addBtn: {
    position: 'fixed',
    bottom: '12px',
    right: '12px',
  },

  topBar: {
    borderBottom: 'solid 1px #E0E0E0',
    padding: '0 12px',
    height: 68,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: grey50,
    logo: {
      width: 48,
      height: 48,
    }
  },
  drawer:{
    boxShadow: 'none',
    top: '68px',
    borderRight: 'solid 1px #E0E0E0',
    borderTop: 'solid 1px #E0E0E0',
    paddingTop: '12px',
    paddingBottom: '68px',
  }

}
export default Wallet
