/** @format */

// Third Parties
import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// Redux
import {
  loadTodosEpic,
  addTodoEpic,
  deleteTodoEpic,
  toggleTodoEpic,
  toggleAllEpic,
  deleteAllEpic,
  selectTodoEpic,
} from '../todos/redux/todos.epics';
import { todosReducer, todosFeatureName } from '../todos/redux/todos.slice';

const rootReducer = combineReducers({ [todosFeatureName]: todosReducer });
export type AppState = ReturnType<typeof rootReducer>;

const rootEpic = combineEpics(
  loadTodosEpic,
  addTodoEpic,
  deleteTodoEpic,
  deleteAllEpic,
  toggleTodoEpic,
  toggleAllEpic,
  selectTodoEpic
);
const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), epicMiddleware],
});

epicMiddleware.run(rootEpic);
