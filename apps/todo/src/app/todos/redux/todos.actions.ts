/** @format */

// Third Parties
import { ActionCreator } from 'redux';

// App Models
import { Todo } from '../todo.model';

export enum TodosActions {
  ToggleTodo = '[Todos - TodoItem Component] Toggle todo',
  ToggleAll = '[Todos - Todos Component] Toggle all',
  AddTodo = '[Todos - Todos Component] Add todo',
  DeleteTodo = '[Todos - Todos Component] Delete todo'
}

interface ToggleTodo {
  type: TodosActions.ToggleTodo;
  payload: string;
}

interface ToggleAll {
  type: TodosActions.ToggleAll;
}

interface AddTodo {
  type: TodosActions.AddTodo;
  payload: Todo;
}

interface DeleteTodo {
  type: TodosActions.DeleteTodo;
  payload: string;
}

export type TodosActionTypes = ToggleTodo | ToggleAll | AddTodo | DeleteTodo;

type actionCreatorKeys = 'toggleTodo' | 'toggleAll' | 'addTodo' | 'deleteTodo';
export const todoActionCreators: {
  [K in actionCreatorKeys]: ActionCreator<TodosActionTypes>;
} = {
  toggleTodo: (id: string) => ({
    type: TodosActions.ToggleTodo,
    payload: id
  }),
  toggleAll: () => ({ type: TodosActions.ToggleAll }),
  addTodo: (todo: Todo) => ({
    type: TodosActions.AddTodo,
    payload: todo
  }),
  deleteTodo: (id: string) => ({
    type: TodosActions.DeleteTodo,
    payload: id
  })
};
