/** @format */

import React from 'react';
import ReactDOM from 'react-dom';

// Third Parties
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

// Redux
import { store, persistor } from './app/redux/store';

// App Components
import { App } from './app/app.component';

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );

render();
