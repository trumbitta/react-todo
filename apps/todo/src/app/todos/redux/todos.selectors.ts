/** @format */

// Third Parties
import { createSelector } from 'reselect';

// Redux
import { AppState } from '../../redux/app-state.interface';
import { TodosState } from './todos.reducer';

// App Models
import { TodosMap, Todo } from '../todo.model';

export const selectTodos = (state: AppState) => state.todosReducer;

export const selectTodosByIds = createSelector<AppState, TodosState, TodosMap>(
  [selectTodos],
  state => state.byIds
);

export const selectTodosAllIds = createSelector<AppState, TodosState, number[]>(
  [selectTodos],
  state => state.allIds
);

export const makeSelectTodosTodoById = (id: number) =>
  createSelector<AppState, TodosMap, Todo>(
    [selectTodosByIds],
    todos => todos[id]
  );
