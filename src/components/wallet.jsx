import React     from 'react';
import PropTypes from 'prop-types';
import Radium    from  'radium';

import ContentAdd           from 'material-ui/svg-icons/content/add';
import MenuIcon           from 'material-ui/svg-icons/navigation/menu';
import { grey50, grey200 }  from 'material-ui/styles/colors';
import FlatButton           from 'material-ui/FlatButton';
import Drawer               from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem             from 'material-ui/MenuItem';

import Logo              from 'components/logo.jsx';
import WalletItem        from 'components/wallet-item.jsx';
import WalletItemAddEdit from 'components/wallet-item-add-edit.jsx';
import Size from 'helper/responsive-size';

class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentItemId: null,
      showAddEdit: false,
      drawerDocked: window.innerWidth > 840,
      drawerOpened: false,
    };
    this.renderDrawer = this.renderDrawer.bind(this);
    this.handleOnEditClick = this.handleOnEditClick.bind(this);
    this.handleOnAddBtnClick = this.handleOnAddBtnClick.bind(this);
    this.handleOnSaveClick = this.handleOnSaveClick.bind(this);
    this.handleOnCreateClick = this.handleOnCreateClick.bind(this);
    this.handleOnRemoveClick = this.handleOnRemoveClick.bind(this);
    this.handleOnCancelClick = this.handleOnCancelClick.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.handleDrawerRequestChange = this.handleDrawerRequestChange.bind(this);
  }


  componentWillMount() {
    let { items=[]} = this.props;
    if (items && items.length) this.setState({ currentItemId: items[0]._id });
  }


  openDrawer() {
    this.setState({ drawerOpened: true })
  }

  handleDrawerRequestChange(open) {
    this.setState({ drawerOpened: open })
  }

  renderDrawer() {
    let { items=[]} = this.props;
    let { currentItemId, drawerDocked, drawerOpened } = this.state;
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
      <Drawer
        containerStyle={{ ...styles.drawer, top: drawerDocked ? '68px' : '0px' }}
        open={drawerDocked ? true : drawerOpened} docked={drawerDocked}
        onRequestChange={this.handleDrawerRequestChange}
        >
        {drawerItems}
      </Drawer>
    )
  }


  handleClickOnDrawerItem(e, itemId) {
    this.setState({ currentItemId: itemId, showAddEdit: false, drawerOpened: false })
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
    let { currentItemId, showAddEdit, drawerDocked } = this.state;
    let item = items.find(item => item._id === currentItemId)
    if (!item && !showAddEdit) return null; // TODO - add  intro section here, show how to get started

    let containerStyle = drawerDocked ? { marginLeft: '256px' } : {}
    if (showAddEdit) {
      return (
        <div style={containerStyle}>
          <WalletItemAddEdit item={item}
            onClickCancel={this.handleOnCancelClick}
            onClickCreate={this.handleOnCreateClick}
            onClickRemove={this.handleOnRemoveClick}
            onClickSave={this.handleOnSaveClick} />
        </div>
      )
    } else {
      return (
        <div style={containerStyle}>
          <WalletItem item={item} onClickEdit={this.handleOnEditClick}/>
        </div>
      )
    }
  }


  render() {
    let { logout, items=[]} = this.props;
    let { showAddEdit, drawerDocked } = this.state;

    return (
      <div style={styles.root}>
        <div style={styles.topBar}>
          { drawerDocked ? null : <FlatButton onTouchTap={this.openDrawer} style={styles.menuBtn} icon={<MenuIcon/>} /> }
          <Logo style={styles.topBar.logo} />
          <FlatButton onTouchTap={logout} label='logout' style={{ marginLeft: 'auto' }} />
        </div>
        {this.renderDrawer()}
        {this.renderWalletItem()}
        { showAddEdit ? null :
            <FloatingActionButton style={styles.addBtn} onTouchTap={this.handleOnAddBtnClick}>
              <ContentAdd />
            </FloatingActionButton>
        }
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
    borderRight: 'solid 1px #E0E0E0',
    borderTop: 'solid 1px #E0E0E0',
    paddingTop: '12px',
    paddingBottom: '68px',
  },
  drawerItem: {
    textTransform: 'capitalize',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  menuBtn: {
    minWidth: '42px',
    marginRight: '12px',
  }

}
export default Radium(Wallet)
