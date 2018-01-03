import React, { Component } from 'react';
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
          <div className="form">
            <div className="fieldset">
              <div className="inputField">
                <label htmlFor="origin">Origin:</label>
                <input id="origin" type="text" align="left" />
              </div>
              <div className="inputField">
                <label htmlFor="destination">Destination:</label>
                <input id="destination" type="text" />
              </div>
            </div>
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
