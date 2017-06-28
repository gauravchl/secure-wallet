import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Clipboard from 'clipboard';
import { grey300, grey600, grey900 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import Snackbar from 'material-ui/Snackbar';
import { Screen, Size } from 'helper/responsive-size';


class WalletItem extends React.Component {
  constructor(props){
    super(props);
    this.state = { snackMessage: '' };
    this.setClipboard = this.setClipboard.bind(this);
    this.unsetClipboard = this.unsetClipboard.bind(this);
    this.showSnack = this.showSnack.bind(this);
    this.handleSnackClose = this.handleSnackClose.bind(this);
  }


  componentDidMount() {
    this.setClipboard();
    this._isMounted = true;
  }


  componentWillUnmount() {
    this.unsetClipboard();
    this._isMounted = false;
  }


  setClipboard() {
    this._clipboard = new Clipboard('.pwd-copy');
    this._clipboard.on('success', (e) => {
      this.showSnack('Password copied to clipboard');
    });
    this._clipboard.on('error', (e) => {
      console.log(e);
    })
  }


  unsetClipboard() {
    this._clipboard.destroy()
  }


  showSnack(msg) {
    this.setState({ snackMessage: msg })
  }


  handleSnackClose() {
    this.setState({ snackMessage: '' });
  }


  render() {
    let { item, onClickEdit } = this.props;
    let { snackMessage } = this.state;
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
            { !item.data.password ? null :
                <IconButton iconStyle={styles.copyBtn}
                  tooltip='copy' className='pwd-copy'
                  data-clipboard-text={item.data.password} >
                  <CopyIcon/>
                </IconButton>
            }
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
        <Snackbar
          open={Boolean(snackMessage)}
          message={snackMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackClose}/>
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
    [Screen.SM]: {
      height: '52px',
      fontSize: '22px',
      marginBottom: '12px',
    }
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
      [Screen.XXSM]: {
        flex: '0 0 100px',
      },
    },
    value: {
      fontWeight: '200',
      wordBreak: 'break-all',
    }
  },
  passwordField: {
    WebkitTextSecurity: 'disc',
  },
  notes: {
    whiteSpace: 'pre-line',
  },
  copyBtn: {
    width: '18px',
    height: '18px',
    color: grey600,
  }
}
export default Radium(WalletItem);
