import React, { Component } from 'react';
import InputField from '../InputField/InputField';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log('hi');
  }
  render() {
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
          <button id="submitButton">Gimme the Distance!</button>
        </div>
      </div>
    );
  }
}

export default App;
