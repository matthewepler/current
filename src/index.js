import React from 'react';
import ReactDOM from 'react-dom';
import 'gridly/dist/prefixed/gridly.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* eslint-disable no-undef */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
/* eslint-enable no-undef */
