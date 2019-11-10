/** @format */

import React from 'react';
import ReactDOM from 'react-dom';

// Third Parties
import { Provider } from 'react-redux';

// Redux
import { store } from './app/redux/store';

// App Components
import App from './app/app.component';

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

render();
