/** @format */

// Third Parties
import { ActionCreator } from 'redux';

// App Models
import { Todo } from '../todo.model';

export enum TodosActions {
  ToggleTodo = '[Todos - TodoItem Component] Toggle todo',
  AddTodo = '[Todos - Todos Component] Add todo',
  DeleteTodo = '[Todos - Todos Component] Delete todo'
}

export interface ToggleTodo {
  type: TodosActions.ToggleTodo;
  payload: string;
}

export interface AddTodo {
  type: TodosActions.AddTodo;
  payload: Todo;
}

export interface DeleteTodo {
  type: TodosActions.DeleteTodo;
  payload: string;
}

export type TodosActionTypes = ToggleTodo | AddTodo | DeleteTodo;

type actionCreatorKeys = 'toggleTodo' | 'addTodo' | 'deleteTodo';
export const todoActionCreators: {
  [K in actionCreatorKeys]: ActionCreator<TodosActionTypes>;
} = {
  toggleTodo: (id: string) => ({
    type: TodosActions.ToggleTodo,
    payload: id
  }),
  addTodo: (todo: Todo) => ({
    type: TodosActions.AddTodo,
    payload: todo
  }),
  deleteTodo: (id: string) => ({
    type: TodosActions.DeleteTodo,
    payload: id
  })
};
