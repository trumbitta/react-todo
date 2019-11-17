/** @format */

import React from 'react';
import ReactDOM from 'react-dom';

// Third Parties
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { store } from './app/redux/store';

// App Components
import { App } from './app/app.component';

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  );

render();
