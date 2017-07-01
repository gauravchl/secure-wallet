import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { grey200, grey300, grey600, grey900 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import KeyIcon from 'material-ui/svg-icons/communication/vpn-key';
import { Size, Screen } from 'helper/responsive-size';
import PasswordGenerator from 'components/password-generator.jsx';

class WalletItemAddEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = { showPasswordGenerator: false };
    this.handleOnClickSave = this.handleOnClickSave.bind(this);
    this.handleOnClickRemove = this.handleOnClickRemove.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.togglePasswordGenerator = this.togglePasswordGenerator.bind(this);
  }


  togglePasswordGenerator() {
    this.setState({ showPasswordGenerator: !this.state.showPasswordGenerator });
  }


  handleOnClickSave() {
    let { item, onClickSave, onClickCreate } = this.props;

    let website = this._tfWebsite.getValue();
    if (website && website.indexOf('http') < 0) website = 'https://' + website;

    let newItem = { ...item,
      title: this._tfTitle.getValue(),
      data: {
        username: this._tfUsername.getValue(),
        password: this._tfPassword.getValue(),
        website: website,
        notes: this._tfNotes.getValue(),
      }
    }

    if (newItem._id) onClickSave(newItem);
    else onClickCreate(newItem);
  }

  handleOnClickRemove() {
    let { item, onClickRemove } = this.props;
    if (!item) return;
    onClickRemove(item._id);
  }

  setPassword(password) {
    this._tfPassword.getInputNode().value = password;
    this._tfPassword.setState({ hasValue: true });
  }

  render() {
    let { item, onClickCancel } = this.props;
    let { showPasswordGenerator } = this.state;
    let isEdit = !!item;
    let showFloatLabel = window.innerWidth < Size.XSM
    return (
      <div style={styles.root}>
        <div style={styles.titleBar}>
          <span>{item && item.title || 'Add New Item'}</span>
        </div>

        <div style={styles.container}>
          <div style={styles.field}>
            <div style={styles.field.leftCol}>title</div>
            <div style={styles.field.rightCol}>
              <TextField
                style={styles.textField}
                ref={(ref) => this._tfTitle = ref}
                inputStyle={{ textTransform: 'capitalize' }}
                defaultValue={item && item.title}
                floatingLabelText={showFloatLabel ? 'Title' : null }
                hintText='Add title'/>
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.leftCol}>username</div>
            <div style={styles.field.rightCol}>
              <TextField
                style={styles.textField}
                ref={(ref) => this._tfUsername = ref}
                defaultValue={item && item.data.username}
                floatingLabelText={showFloatLabel ? 'username or email' : null }
                hintText='username or email'/>
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.leftCol}>password</div>
            <div style={styles.field.rightCol}>
              <TextField
                style={{ ...styles.textField, width: 'calc(100% - 48px)' }}
                ref={(ref) => this._tfPassword = ref}
                type={ showPasswordGenerator ? 'text' : 'password' }
                defaultValue={item && item.data.password}
                floatingLabelText={showFloatLabel ? 'Pasword' : null }
                hintText='Add pasword' />
              <IconButton
                style={styles.btnTogglePwdGenerator}
                tooltip='password generator'
                tooltipPosition='top-left'
                iconStyle={{ color: grey600 }}
                onTouchTap={this.togglePasswordGenerator}>
                <KeyIcon/>
              </IconButton>

              { showPasswordGenerator ? <PasswordGenerator onSet={this.setPassword} /> : null }
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.leftCol}>website</div>
            <div style={{ ...styles.field.rightCol, ...styles.website }}>
              <TextField
                style={styles.textField}
                ref={(ref) => this._tfWebsite = ref}
                defaultValue={item && item.data.website}
                floatingLabelText={showFloatLabel ? 'Website' : null }
                hintText='Add website link' />
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.leftCol}>notes</div>
            <div style={styles.field.rightCol}>
              <TextField
                style={styles.textField}
                ref={(ref) => this._tfNotes = ref}
                defaultValue={item && item.data.notes} multiLine={true} rows={4}
                id='notes'
                floatingLabelText={showFloatLabel ? 'Notes' : null }
                hintText='Notes'
                hintStyle={{ top: '12px' }}/>
            </div>
          </div>
        </div>

        <div style={styles.actionContainer}>
          { isEdit
            ?  <FlatButton label='Remove' icon={<DeleteIcon />} primary={true} onTouchTap={this.handleOnClickRemove}/>
            :  null
          }

          <div style={{ float: 'right' }}>
            <FlatButton label='Cancel' primary={true} onTouchTap={onClickCancel} />&nbsp;
            <FlatButton label='Save' primary={true} style={{ backgroundColor: grey200 }} onTouchTap={this.handleOnClickSave}/>
          </div>
        </div>
      </div>
    )
  }
}


WalletItemAddEdit.propTypes = {
  item: PropTypes.object,
  onClickCancel: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickCreate: PropTypes.func.isRequired,
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
  },
  field: {
    display: 'flex',
    minHeight: '62px',
    leftCol: {
      textTransform: 'capitalize',
      flex: '0 0 172px',
      paddingTop: '18px',
      [Screen.XSM]: {
        display: 'none',
      },
    },
    rightCol: {
      fontWeight: '200',
      width: '100%',
      maxWidth: '372px',
      [Screen.XSM]: {
        maxWidth: 'initial',
      }
    }
  },
  textField: {
    width: '100%'
  },
  actionContainer: {
    borderTop: `solid 1px ${grey300}`,
    paddingTop: '12px',
  },
  btnTogglePwdGenerator: {
    color: grey600,
  },

}
export default Radium(WalletItemAddEdit)
