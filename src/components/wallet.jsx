import React from 'react';
import PropTypes from 'prop-types'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Logo from 'components/logo.jsx';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.renderDrawer = this.renderDrawer.bind(this);
  }

  renderDrawer() {
    let { items=[]} = this.props;
    let drawerItems = items.map((item, index) => {
      return <MenuItem key={index}>{item.title}</MenuItem>
    })

    return (
      <Drawer containerStyle={styles.drawer} open={true} docked={true}>
        {drawerItems}
      </Drawer>
    )
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
