/** @format */

// Third Parties
import { createSelector } from 'reselect';

// Redux
import { TodosState } from './todos.reducer';
import { AppState } from '../../redux/app-state.interface';

// App Models
import { TodosMap, Todo } from '../todo.model';

export const selectTodos = (state: AppState) => state.todosReducer;

export const selectTodosCurrent = createSelector<
  AppState,
  TodosState,
  TodosMap
>(
  [selectTodos],
  state => state.current
);

export const selectTodosCurrentArray = createSelector<
  AppState,
  TodosMap,
  Todo[]
>(
  [selectTodosCurrent],
  current => {
    const todosArray: Todo[] = [];

    for (const prop in current) {
      todosArray.push(current[prop]);
    }

    return todosArray;
  }
);
