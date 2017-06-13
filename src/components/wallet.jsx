import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Wallet extends React.Component {
  constructor(props){
    super(props);

  }


  render() {
    let { onClickAddItem, items=[]} = this.props;

    return (
      <div style={styles.root}>
        Items:
        <FloatingActionButton style={styles.addBtn} onTouchTap={onClickAddItem}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}



const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    position: 'fixed',
    bottom: '12px',
    right: '12px',
  }

}
export default Wallet
