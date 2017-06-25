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
    this.handleOnAddBtnClick = this.handleOnAddBtnClick.bind(this);
    this.handleOnSaveClick = this.handleOnSaveClick.bind(this);
    this.handleOnCreateClick = this.handleOnCreateClick.bind(this);
    this.handleOnRemoveClick = this.handleOnRemoveClick.bind(this);
    this.handleOnCancelClick = this.handleOnCancelClick.bind(this);
  }


  componentWillMount() {
    let { items=[]} = this.props;
    if (items && items.length) this.setState({ currentItemId: items[0]._id })
  }


  renderDrawer() {
    let { items=[]} = this.props;
    let { currentItemId } = this.state;
    let drawerItems = items.map((item, index) => {
      let style = item._id ===  currentItemId ? { backgroundColor: grey200 } : null
      return (
        <MenuItem
          style={style}
          innerDivStyle={styles.drawerItem}
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


  handleOnAddBtnClick() {
    this.setState({ showAddEdit: true, currentItemId: null });
  }


  handleOnEditClick() {
    this.setState({ showAddEdit: true });
  }


  handleOnCreateClick(item) {
    let { createItem } = this.props;
    createItem(item);
    this.setState({ showAddEdit: false }, _ => {
      // HACK - To show lastly created item
      // Implement proper redux action
      let { items } = this.props;
      this.setState({ currentItemId: items[0] && items[0]._id })
    });
  }


  handleOnRemoveClick(id) {
    let { removeItem } = this.props;
    removeItem(id);
    let { items } = this.props;
    this.setState({ showAddEdit: false, currentItemId: items[0] && items[0]._id })
  }


  handleOnSaveClick(updatedItem) {
    let { updateItem } = this.props;
    updateItem(updatedItem);
    this.setState({ showAddEdit: false });
  }


  handleOnCancelClick() {
    this.setState({ showAddEdit: false });
  }


  renderWalletItem() {
    let { items=[]} = this.props;
    let { currentItemId, showAddEdit } = this.state;
    let item = items.find(item => item._id === currentItemId)

    if (showAddEdit) {
      return (
        <WalletItemAddEdit item={item}
          onClickCancel={this.handleOnCancelClick}
          onClickCreate={this.handleOnCreateClick}
          onClickRemove={this.handleOnRemoveClick}
          onClickSave={this.handleOnSaveClick} />
      )
    } else {
      if (!item) return null; // TODO - add  intro section here, show how to get started
      return <WalletItem item={item} onClickEdit={this.handleOnEditClick}/>;
    }
  }


  render() {
    let { logout, items=[]} = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.topBar}>
          <Logo style={styles.topBar.logo} />
          <FlatButton onTouchTap={logout} label='logout' style={{ marginLeft: 'auto' }} />
        </div>
        {this.renderDrawer()}
        {this.renderWalletItem()}
        <FloatingActionButton style={styles.addBtn} onTouchTap={this.handleOnAddBtnClick}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}


Wallet.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  createItem: PropTypes.func,
  updateItem: PropTypes.func,
  logout: PropTypes.func
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
  },
  drawerItem: {
    textTransform: 'capitalize',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

}
export default Wallet
