import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Address from '../../components/Address/Address';
import { inputFieldSuccess, inputFieldFail } from '../../actions/inputField';
import { ipv4, ipv6 } from '../../utils/helpers';
import './InputField.css';

class InputField extends Component {
  handleChange(event) {
    const val = event.target.value.trim();
    if (ipv4.test(val) ||
        ipv6.test(val)) {
      this.props.success({
        id: this.props.idString,
        value: val,
      });
    } else {
      this.props.fail({
        id: this.props.idString,
        value: val,
      });
    }
  }

  render() {
    const inputStatus = classnames({
      'input-error': this.props[this.props.idString] === false,
      'input-success': this.props[this.props.idString]
        && this.props[this.props.idString].length > 0,
    });

    return (
      <div className="inputField col-half">
        <label htmlFor={this.props.idString}>{this.props.text}</label>
        {
          this.props.duration.length > 0 ?
            <div id={this.props.idString}>
              <Address idStr={this.props.idString} />
            </div>
          : <input
            id={this.props.idString}
            className={inputStatus}
            type="text"
            onChange={e => this.handleChange(e)}
          />
        }
      </div>
    );
  }
}

InputField.propTypes = {
  duration: PropTypes.string,
  fail: PropTypes.func.isRequired,
  idString: PropTypes.string.isRequired,
  success: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  duration: '',
};

export default connect(
  state => ({
    addresses: state.app.addresses,
    destination: state.inputField.destination,
    duration: state.app.duration,
    origin: state.inputField.origin,
  }),
  dispatch => ({
    success: data => dispatch(inputFieldSuccess(data)),
    fail: data => dispatch(inputFieldFail(data)),
  }),
)(InputField);
