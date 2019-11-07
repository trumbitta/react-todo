/** @format */

import { ActionCreator } from 'redux';

/** @format */

export enum todosActions {
  TOGGLE_TODO = '[Todos - TodoItem] Toggle todo'
}

export interface ToggleTodo {
  type: todosActions;
  payload: number;
}

export type TodosActionTypes = ToggleTodo;

export const todoActionCreators: {
  [key: string]: ActionCreator<TodosActionTypes>;
} = {
  toggleTodo: (id: number) => ({
    type: todosActions.TOGGLE_TODO,
    payload: id
  })
};
