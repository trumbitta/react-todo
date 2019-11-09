/** @format */

// Redux
import { TodosState } from '../todos/redux/todos.slice';
import { todosFeatureName } from '../todos/redux/todos.slice';

// TODO: make it work by using todosFeatureName
export interface AppState {
  todos: TodosState;
}
