import React from 'react';
import ReactDOM from 'react-dom';
import 'gridly/dist/prefixed/gridly.min.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { ApolloProvider } from 'react-apollo';

import client from './apollo';
import App from './containers/App/App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

export function configureStore(env) {
  let createStoreWithMiddleware;

  if (env === 'development') {
    createStoreWithMiddleware = compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )(createStore);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        createStoreWithMiddleware.replaceReducer(rootReducer);
      })
    }
  } else {
    createStoreWithMiddleware = compose(
      applyMiddleware(thunk),
    )(createStore);
  }

  return createStoreWithMiddleware(rootReducer);
}

const store = configureStore(process.env.NODE_ENV);

/* eslint-disable no-undef */
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
/* eslint-enable no-undef */
