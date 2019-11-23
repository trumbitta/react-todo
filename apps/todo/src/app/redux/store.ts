/** @format */

// Third Parties
import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
  key: 'todo-react-redux',
  storage,
};

const rootReducer = combineReducers({ [todosFeatureName]: todosReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

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

export type AppState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    epicMiddleware,
  ],
});
export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);
