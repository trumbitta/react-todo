/** @format */

// Redux
import { TodosActionTypes, todosActions } from './todos.actions';

// App Models
import { TodosMap } from '../todo.model';

export interface TodosState {
  byIds: TodosMap;
  allIds: number[];
}

const initialState: TodosState = {
  byIds: {
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
  },
  allIds: [1, 2, 3, 4]
};

export function todosReducer(
  state = initialState,
  action: TodosActionTypes
): TodosState {
  switch (action.type) {
    case todosActions.TOGGLE_TODO:
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [action.payload]: {
            ...state.byIds[action.payload],
            isDone: !state.byIds[action.payload].isDone
          }
        }
      };

    default:
      return state;
  }
}
