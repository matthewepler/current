import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import InputField from '../InputField/InputField';
import { fetchAddressesAndDistance } from '../../actions/app';
import './App.css';

class App extends Component {
  handleSubmit() {
    if (this.props.formValid) {
      this.props.dispatch(fetchAddressesAndDistance());
    }
  }

  render() {
    const buttonState = classnames({
      deactivated: !this.props.formValid,
    });
    return (
      <div className="AppWrapper">
        <div className="formWrapper">
          <header className="formHeader">
            <h1 className="formTitle">How long is the drive?</h1>
          </header>
          <hr />
          <div className="row">
            <InputField text="Origin:" idString="origin" />
            <InputField text="Destination:" idString="destination" />
          </div>
        </div>
        <div className="formFooter" onClick={() => this.handleSubmit()}>
          <button id="submitButton" className={buttonState}>
            Gimme the Distance!
          </button>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  formValid: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    formValid: state.inputField.origin && state.inputField.destination,
    latLongs: state.latLongs,
  })
)(App);
