/** @format */

// Third Parties
import { createSelector } from 'redux-starter-kit';

// Redux
import { AppState } from '../../redux/store';
import { TodosState } from './todos.slice';

// App Models
import { TodosMap, Todo } from '../todo.model';

export const selectTodos = (state: AppState) => state.todos;

export const selectTodosByIds = createSelector<AppState, TodosState, TodosMap>(
  [selectTodos],
  state => state.byIds
);

export const selectTodosAllIds = createSelector<AppState, TodosState, string[]>(
  [selectTodos],
  state => state.allIds
);

export const makeSelectTodosTodoById = (id: string) =>
  createSelector<AppState, TodosMap, Todo>(
    [selectTodosByIds],
    todos => todos[id]
  );
