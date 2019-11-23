/** @format */

// Third Parties
import { createSelector } from '@reduxjs/toolkit';

// Redux
import { AppState } from '../../redux/store';
import { TodosState } from './todos.slice';

// App Libraries
import { Todo, TodosMap } from '@todo/shared-models';

export const selectTodos = (state: AppState) => state.todos;

export const selectTodosByIds = createSelector<AppState, TodosState, TodosMap>(
  [selectTodos],
  state => state.byIds
);

export const selectTodosAllIds = createSelector<AppState, TodosState, string[]>(
  [selectTodos],
  state => state.allIds
);

export const selectTodosByIdsAsArray = createSelector<AppState, TodosMap, string[], Todo[]>(
  [selectTodosByIds, selectTodosAllIds],
  (byIds, allIds) => allIds.map(id => byIds[id])
);

export const selectTodosSelected = createSelector<AppState, TodosState, Todo>(
  [selectTodos],
  state => state.selected
);

export const makeSelectTodosTodoById = (id: string) =>
  createSelector<AppState, TodosMap, Todo>([selectTodosByIds], todos => todos[id]);
