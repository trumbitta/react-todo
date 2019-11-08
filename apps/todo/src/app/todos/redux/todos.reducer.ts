/** @format */

// Redux
import { TodosActionTypes, TodosActions } from './todos.actions';

// App Models
import { TodosMap, Todo } from '../todo.model';

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
    case TodosActions.TodosToggleTodo:
      const id = action.payload as number;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            isDone: !state.byIds[id].isDone
          }
        }
      };

    case TodosActions.TodosAddTodo:
      const todo = action.payload as Todo;
      const newId = getNewTodoId();

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [newId]: {
            id: newId,
            isDone: false,
            text: todo.text
          }
        },
        allIds: [...state.allIds, newId]
      };

    default:
      return state;
  }

  // TODO: generate random uuids instead of incremental integers
  function getNewTodoId(): number {
    return state.allIds[state.allIds.length - 1] + 1;
  }
}
