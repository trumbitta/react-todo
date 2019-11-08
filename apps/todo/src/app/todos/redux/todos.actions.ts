/** @format */

// Third Parties
import { ActionCreator } from 'redux';

// App Models
import { Todo } from '../todo.model';

export enum TodosActions {
  TodosToggleTodo = '[Todos - TodoItem Component] Toggle todo',
  TodosAddTodo = '[Todos - Todos Component] Add todo'
}

export interface ToggleTodo {
  type: TodosActions;
  payload: number;
}

export interface AddTodo {
  type: TodosActions;
  payload: Todo;
}

export type TodosActionTypes = ToggleTodo | AddTodo;

export const todoActionCreators: {
  [key: string]: ActionCreator<TodosActionTypes>;
} = {
  toggleTodo: (id: number) => ({
    type: TodosActions.TodosToggleTodo,
    payload: id
  }),
  addTodo: (todo: Todo) => ({
    type: TodosActions.TodosAddTodo,
    payload: todo
  })
};
