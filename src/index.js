import React from 'react';
import ReactDOM from 'react-dom';
import 'gridly/dist/prefixed/gridly.min.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './containers/App/App';
import inputField from './reducers/inputField';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(combineReducers({
  inputField,
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/* eslint-disable no-undef */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
/* eslint-enable no-undef */
