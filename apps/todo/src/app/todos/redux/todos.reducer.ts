/** @format */

// Redux
import { TodosActionTypes, todosActions } from './todos.actions';

// App Models
import { Todo } from '../todo.model';

export interface TodosState {
  todos: { [id: number]: Todo };
}

const initialState: TodosState = {
  todos: {
    1: {
      id: 1,
      isDone: false,
      text: 'fooo'
    }
  }
};

export const todosReducer = (
  state = initialState,
  action: TodosActionTypes
) => {
  switch (action.type) {
    case todosActions.TOGGLE_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload]: {
            ...state.todos[action.payload],
            isDone: !state.todos[action.payload].isDone
          }
        }
      };

    default:
      return state;
  }
};
