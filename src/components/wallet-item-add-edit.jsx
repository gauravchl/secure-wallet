import React from 'react';
import PropTypes from 'prop-types';
import { grey300, grey900 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class WalletItemAddEdit extends React.Component {
  constructor(props){
    super(props);
    this.handleOnClickSave = this.handleOnClickSave.bind(this);
  }


  handleOnClickSave() {
    let { item, onClickSave, onClickCreate } = this.props;

    let newItem = { ...item,
      title: this._tfTitle.getValue(),
      data: {
        username: this._tfUsername.getValue(),
        password: this._tfPassword.getValue(),
        website: this._tfWebsite.getValue(),
        notes: this._tfNotes.getValue(),
      }
    }

    if (newItem._id) onClickSave(newItem);
    else onClickCreate(newItem);
  }

  render() {
    let { item, onClickCancel } = this.props;
    return (
      <div style={styles.root}>
        <div style={styles.titleBar}>
          <span>{item && item.title || 'Create New'}</span>
          <div>
            <FlatButton label='Cancel' primary={true} onTouchTap={onClickCancel} />
            <FlatButton label='Save' primary={true} onTouchTap={this.handleOnClickSave}/>
          </div>
        </div>

        <div>
          <div style={styles.field}>
            <div style={styles.field.name}>title</div>
            <div style={styles.field.value}>
              <TextField
                ref={(ref) => this._tfTitle = ref}
                inputStyle={{ textTransform: 'capitalize' }}
                defaultValue={item && item.title} hintText='Add title'/>
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.name}>username</div>
            <div style={styles.field.value}>
              <TextField
                ref={(ref) => this._tfUsername = ref}
                defaultValue={item && item.data.username} hintText='username or email'/>
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.name}>password</div>
            <div style={{ ...styles.field.value, ...styles.passwordField }}>
              <TextField
                ref={(ref) => this._tfPassword = ref}
                defaultValue={item && item.data.password} hintText='Add pasword' />
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.name}>website</div>
            <div style={{ ...styles.field.value, ...styles.website }}>
              <TextField
                ref={(ref) => this._tfWebsite = ref}
                defaultValue={item && item.data.website} hintText='Add website link' />
            </div>
          </div>

          <div style={{ ...styles.field, alignItems: 'initial', height: 'auto' }}>
            <div style={{ ...styles.field.name, marginTop: '12px' }}>notes</div>
            <div style={styles.field.value}>
              <TextField
                ref={(ref) => this._tfNotes = ref}
                defaultValue={item && item.data.notes} multiLine={true} rows={2} id='notes' hintText='Some notes' />
            </div>
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
    height: 'calc(100% - 72px - 18px - 18px)',
    marginLeft: '256px',
    padding: '0 24px',
    color: grey900,
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
  field: {
    display: 'flex',
    alignItems: 'center',
    height: '62px',
    name: {
      textTransform: 'capitalize',
      flex: '0 0 172px',
    },
    value: {
      fontWeight: '200'
    }
  },
  passwordField: {
    WebkitTextSecurity: 'disc',
  }

}
export default WalletItemAddEdit
