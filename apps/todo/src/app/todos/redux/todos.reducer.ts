/** @format */

// Redux
import { TodosActionTypes, todosActions } from './todos.actions';

// App Models
import { TodosMap } from '../todo.model';
import { ReducersMapObject } from 'redux';

export interface TodosState {
  current: TodosMap;
}

const initialState: TodosState = {
  current: {
    1: {
      id: 1,
      isDone: false,
      text: 'Add foo'
    },
    2: {
      id: 2,
      isDone: false,
      text: 'Call bar'
    },
    3: {
      id: 3,
      isDone: false,
      text: 'Drink baz'
    },
    4: {
      id: 4,
      isDone: false,
      text: 'Stuff foo into bar'
    }
  }
};

export function todosReducer(
  state = initialState,
  action: TodosActionTypes
): TodosState {
  switch (action.type) {
    case todosActions.TOGGLE_TODO:
      return {
        ...state,
        current: {
          ...state.current,
          [action.payload]: {
            ...state.current[action.payload],
            isDone: !state.current[action.payload].isDone
          }
        }
      };

    default:
      return state;
  }
}
