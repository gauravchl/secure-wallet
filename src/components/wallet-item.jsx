import React from 'react';
import PropTypes from 'prop-types'

class WalletItem extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let { item } = this.props;
    return (
      <div style={styles.root}>
        item
      </div>
    )
  }
}


WalletItem.propTypes = {
  item: PropTypes.object,
}


const styles = {
  root: {
    height: 'calc(100% - 72px - 18px - 18px)',
    marginLeft: '256px',
    padding: '18px',
  },

}
export default WalletItem
