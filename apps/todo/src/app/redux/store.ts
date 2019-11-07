/** @format */

// Third Parties
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

// Redux
import { todosReducer } from '../todos/redux/todos.reducer';
import { todoActionCreators } from '../todos/redux/todos.actions';

const rootReducer = combineReducers({ todosReducer });

export const store = createStore(
  rootReducer,
  devToolsEnhancer({ actionCreators: todoActionCreators })
);
