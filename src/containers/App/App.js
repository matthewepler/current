import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { PulseLoader } from 'react-spinners';
import InputField from '../InputField/InputField';
import { fetchLocationDataAndDuration } from '../../actions/app';
import './App.css';

class App extends Component {
  handleSubmit() {
    if (this.props.formValid) {
      this.props.dispatch(fetchLocationDataAndDuration());
    }
  }
  render() {
    // button should appear transparent if form is not valid
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
          <p className="errMsg">{this.props.errMsg}</p>


          <div className="duration">
            {
              this.props.dataPending ?
                <PulseLoader color="#9e42f4" loading={this.props.dataPending}/>
                :
                <div>
                  <h2>{this.props.duration}</h2>
                  <p className="voice">{this.props.voice}</p>
                </div>
            }
          </div>
          {
            !this.props.dataPending && !this.props.duration ?
              <button id="submitButton" className={buttonState}>
                Gimme the Distance!
              </button>
            : ''
          }

        </div>
      </div>
    );
  }
}

App.propTypes = {
  dataPending: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  duration: PropTypes.string,
  errMsg: PropTypes.string,
  formValid: PropTypes.bool,
  voice: PropTypes.string,
};

App.defaultProps = {
  dataPending: false,
  duration: '',
  errMsg: '',
  formValid: false,
  voice: '',
};

export default connect(state => ({
  formValid: state.inputField.origin && state.inputField.destination,
  latLongs: state.app.latLongs,
  errMsg: state.app.errMsg,
  duration: state.app.duration,
  dataPending: state.app.dataPending,
  voice: state.app.voice,
}))(App);
