import React from 'react';
import PropTypes from 'prop-types';
import Generator from 'generate-password';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import { grey300, grey400 } from 'material-ui/styles/colors';


class PasswordGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 15,
      numbers: true,
      symbols: false,
      uppercase: true,
    }
    this.getPassword = this.getPassword.bind(this);
    this.handleToggleNumber = this.handleToggleNumber.bind(this);
    this.handleToggleSymbol = this.handleToggleSymbol.bind(this);
    this.handleToggleUppercase = this.handleToggleUppercase.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }


  getPassword() {
    const { length, numbers, symbols, uppercase } = this.state;
    return Generator.generate({ length, numbers, symbols, uppercase });
  }


  handleToggleNumber(e, isChecked) {
    this.setState({ numbers: isChecked })
  }


  handleToggleSymbol(e, isChecked) {
    this.setState({ symbols: isChecked })
  }


  handleToggleUppercase(e, isChecked) {
    this.setState({ uppercase: isChecked })
  }


  handleSliderChange(e, value) {
    this.setState({ length: value })
  }


  render() {
    let { numbers, symbols, uppercase, length } = this.state;
    return (
      <div style={styles.root}>
        <div style={styles.pwdContainer}>
          {this.getPassword()}
        </div>

        <div style={styles.checkboxContainer}>
          <Checkbox label='Numbers'
            iconStyle={styles.checkbox.icon}
            style={styles.checkbox}
            defaultChecked={numbers}
            onCheck={this.handleToggleNumber}/>
          <Checkbox label='Symbols'
            iconStyle={styles.checkbox.icon}
            style={styles.checkbox}
            defaultChecked={symbols}
            onCheck={this.handleToggleSymbol}/>
          <Checkbox label='Uppercase'
            iconStyle={styles.checkbox.icon}
            style={{ ...styles.checkbox, marginRight: '0px' }}
            defaultChecked={uppercase}
            onCheck={this.handleToggleUppercase}/>
        </div>

        <div style={styles.sliderContainer}>
          <span>Length</span>
          <Slider min={5} max={100} step={1}
            style={{ flex: '1', padding: '0 18px' }}
            sliderStyle={styles.slider}
            value={length}
            defaultValue={length}
            onChange={this.handleSliderChange} />
          <span>{length}</span>
        </div>

      </div>
    )

  }
}


PasswordGenerator.propTypes = {
  onClose: PropTypes.func,
  onSet: PropTypes.func,
}


const styles = {
  root: {
    maxWidth: '300px',
    width: '100%',
    padding: '12px',
    background: '#fff',
    boxShadow: '2px 2px 6px #000',
  },
  pwdContainer: {
    textAlign: 'center',
    paddingBottom: '12px',
    marginBottom: '18px',
    borderBottom: `solid 1px ${grey300}`,
    wordBreak: 'break-word',
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
  },
  checkbox: {
    width: 'auto',
    icon: {
      marginRight: '8px',
    }
  },
  sliderContainer: {
    display: 'flex',
    width: '100%',
    margin: '18px 0',
    fontSize: '13px',
  },
  slider: {
    margin: '0px',
  }
}

export default PasswordGenerator
