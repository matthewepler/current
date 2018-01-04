import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { inputFieldSuccess, inputFieldFail } from '../../actions/inputField';
import { ipv4, ipv6 } from '../../utils/helpers';
import './InputField.css';

class InputField extends Component {
  handleBlur(event) {
    if (ipv4.test(event.target.value.trim()) ||
        ipv6.test(event.target.value.trim())) {
      this.props.success({
        id: this.props.idString,
      });
    } else {
      this.props.fail({
        id: this.props.idString,
      });
    }
  }

  render() {
    const inputStatus = classnames({
      'input-error': this.props[this.props.idString]===false,
      'input-success': this.props[this.props.idString]===true,
    });

    return (
      <div className="inputField col-half">
        <label htmlFor={this.props.idString}>{this.props.text}</label>
        <input
          id={this.props.idString}
          className={inputStatus}
          type="text"
          onBlur={e => this.handleBlur(e)}
        />
      </div>
    );
  }
}

InputField.propTypes = {
  text: PropTypes.string.isRequired,
  idString: PropTypes.string.isRequired,
  success: PropTypes.func.isRequired,
  fail: PropTypes.func.isRequired,
};


export default connect(
  state => ({
    origin: state.inputField.origin,
    destination: state.inputField.destination,
  }),
  dispatch => ({
    success: data => dispatch(inputFieldSuccess(data)),
    fail: data => dispatch(inputFieldFail(data)),
  }),
)(InputField);
