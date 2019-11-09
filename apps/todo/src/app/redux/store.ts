/** @format */

// Third Parties
import { combineReducers } from 'redux';
import { configureStore } from 'redux-starter-kit';

// Redux
import { todosReducer, todosFeatureName } from '../todos/redux/todos.slice';

const rootReducer = combineReducers({ [todosFeatureName]: todosReducer });

export const store = configureStore({ reducer: rootReducer });
