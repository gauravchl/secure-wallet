import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { grey300, grey900 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import Size from 'helper/responsive-size';


class WalletItem extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    let { item, onClickEdit } = this.props;
    return (
      <div style={styles.root}>
        <div style={styles.titleBar}>
          <span>{item.title}</span>
          <div>
            <FlatButton label='Edit' primary={true} onTouchTap={onClickEdit} />
          </div>
        </div>

        <div style={styles.container}>
          <div style={styles.field}>
            <div style={styles.field.name}>username</div>
            <div style={styles.field.value}>{item.data.username}</div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.name}>password</div>
            <div style={{ ...styles.field.value, ...styles.passwordField }}>{item.data.password}</div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.name}>website</div>
            <div style={{ ...styles.field.value, ...styles.website }}>
              <a href={item.data.website} target='_blank'>
                {item.data.website && item.data.website.replace(/https:\/\/|http:\/\//, '')}
              </a>
            </div>
          </div>

          <div style={{ ...styles.field, alignItems: 'initial', marginTop: '18px' }}>
            <div style={styles.field.name}>notes</div>
            <div style={{ ...styles.field.value, ...styles.notes }}>{item.data.notes}</div>
          </div>
        </div>
      </div>
    )
  }
}


WalletItem.propTypes = {
  item: PropTypes.object,
  onClickEdit: PropTypes.func,
}


const styles = {
  root: {
    height: 'calc(100vh - 72px - 18px)',
    padding: '0 24px',
    color: grey900,
    display: 'flex',
    flexDirection: 'column',
  },
  titleBar: {
    borderBottom: `solid 1px ${grey300}`,
    fontSize: '24px',
    fontWeight: '100',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    height: '72px',
    marginBottom: '32px',
    justifyContent: 'space-between',
  },
  container: {
    flex: '1',
    overflowY: 'scroll',
    paddingBottom: '72px',
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '62px',
    name: {
      textTransform: 'capitalize',
      flex: '0 0 172px',
      [Size.XXSM]: {
        flex: '0 0 100px',
      },
    },
    value: {
      fontWeight: '200'
    }
  },
  passwordField: {
    WebkitTextSecurity: 'disc',
  },
  notes: {
    whiteSpace: 'pre-line',
  }
}
export default Radium(WalletItem);
