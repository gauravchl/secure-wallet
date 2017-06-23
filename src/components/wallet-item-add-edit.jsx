import React from 'react';
import PropTypes from 'prop-types';
import { grey300, grey900 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

class WalletItemAddEdit extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let { item } = this.props;
    return (
      <div style={styles.root}>
        <div style={styles.titleBar}>
          <span>{item.title}</span>
        </div>

        <div>
          <div style={styles.field}>
            <div style={styles.field.name}>title</div>
            <div style={styles.field.value}><TextField defaultValue={item.title} hintText='required'/></div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.name}>username</div>
            <div style={styles.field.value}><TextField defaultValue={item.data.username} hintText='username or email'/></div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.name}>password</div>
            <div style={{ ...styles.field.value, ...styles.passwordField }}>
              <TextField defaultValue={item.data.password} hintText='Add pasword' />
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.field.name}>website</div>
            <div style={{ ...styles.field.value, ...styles.website }}>
              <TextField defaultValue={item.data.website} hintText='Add website link' />
            </div>
          </div>

          <div style={{ ...styles.field, alignItems: 'initial', height: 'auto' }}>
            <div style={{ ...styles.field.name, marginTop: '12px' }}>notes</div>
            <div style={styles.field.value}>
              <TextField defaultValue={item.data.notes} multiLine={true} rows={2} id='notes' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


WalletItemAddEdit.propTypes = {
  item: PropTypes.object,
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
