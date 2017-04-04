// modules
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactBootstrap from '../node_modules/react-bootstrap/dist/react-bootstrap.js';
import moment from '../node_modules/moment/min/moment.min.js';
import momentRange from '../node_modules/moment-range/dist/moment-range.js';

import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

// api
import FirebaseApi from './api/firebase';

// actions
import {authInitialized} from './actions/authActions';
import {ajaxCallError, beginAjaxCall} from './actions/ajaxStatusActions';

// components
import App from './components/App';

// Store
import initialState from './reducers/initialState';
import configureStore from './store/configureStore'; //eslint-disable-line import/default

// styles
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/react-daterange-picker/dist/css/react-calendar.css';

// store initialization
const store = configureStore(initialState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('root');

// Initialize Firebase Auth and then start the app
store.dispatch(beginAjaxCall());
FirebaseApi.initAuth()
  .then(
    user => {
      store.dispatch(authInitialized(user));

      ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <App history={history} store={store}/>
          </Provider>
        </AppContainer>,
        rootEl
      );

      if (module.hot) {
        module.hot.accept('./components/App', () => {
          // If you use Webpack 2 in ES modules mode, you can
          // use <App /> here rather than require() a <NextApp />.
          const NextApp = require('./components/App').default;
          ReactDOM.render(
            <AppContainer>
              <Provider store={store}>
                <NextApp history={history} store={store}/>
              </Provider>
            </AppContainer>,
            rootEl
          );
        });
      }
    })
  .catch(
    error => {
      store.dispatch(ajaxCallError());
      console.error('error while initializing Firebase Auth'); // eslint-disable-line no-console
      console.error(error); // eslint-disable-line no-console
    });
