import React     from 'react';
import PropTypes from 'prop-types';

import ContentAdd           from 'material-ui/svg-icons/content/add';
import { grey50, grey200 }  from 'material-ui/styles/colors';
import FlatButton           from 'material-ui/FlatButton';
import Drawer               from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem             from 'material-ui/MenuItem';

import Logo              from 'components/logo.jsx';
import WalletItem        from 'components/wallet-item.jsx';
import WalletItemAddEdit from 'components/wallet-item-add-edit.jsx';

class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentItemId: null,
      showAddEdit: false,
    };
    this.renderDrawer = this.renderDrawer.bind(this);
    this.handleOnEditClick = this.handleOnEditClick.bind(this);
  }


  componentWillMount() {
    let { items=[]} = this.props;
    let { currentItemId } = this.state;
    if (items && items.length) this.setState({ currentItemId: items[0]._id })
  }


  renderDrawer() {
    let { items=[]} = this.props;
    let { currentItemId } = this.state;
    let style = { backgroundColor: grey200 };
    let drawerItems = items.map((item, index) => {
      return (
        <MenuItem
          style={item._id === currentItemId ? style : {}}
          onTouchTap={(e) => this.handleClickOnDrawerItem(e, item._id)}
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


  handleClickOnDrawerItem(e, itemId) {
    this.setState({ currentItemId: itemId, showAddEdit: false })
  }


  handleOnEditClick() {
    this.setState({ showAddEdit: true });
  }


  renderWalletItem() {
    let { items=[]} = this.props;
    let { currentItemId, showAddEdit } = this.state;
    let item = items.find(item => item._id === currentItemId)
    console.log('renderWalletItem - ', currentItemId, item)

    if (showAddEdit) {
      return <WalletItemAddEdit item={item} />
    } else {
      return <WalletItem item={item} onClickEdit={this.handleOnEditClick}/>
    }
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
