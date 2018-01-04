import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import InputField from '../InputField/InputField';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log('hi');
  }
  render() {
    const buttonState = classnames({
      deactivated: this.props.formValid
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
        <div className="formFooter">
          <button id="submitButton" className={buttonState}>Gimme the Distance!</button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    formValid: !state.inputField.origin && !state.inputField.destination,
  })
)(App);
