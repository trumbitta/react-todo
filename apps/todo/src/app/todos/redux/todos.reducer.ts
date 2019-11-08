/** @format */

// Third Parties
import * as uuid from 'uuid';

// Redux
import { TodosActionTypes, TodosActions } from './todos.actions';

// App Models
import { TodosMap, Todo } from '../todo.model';

export interface TodosState {
  byIds: TodosMap;
  allIds: string[];
}

const allIds: string[] = [uuid(), uuid(), uuid(), uuid()];

const initialState: TodosState = {
  byIds: {
    [allIds[0]]: {
      id: allIds[0],
      isDone: false,
      text: 'Add foo'
    },
    [allIds[1]]: {
      id: allIds[1],
      isDone: false,
      text: 'Call bar'
    },
    [allIds[2]]: {
      id: allIds[2],
      isDone: false,
      text: 'Drink baz'
    },
    [allIds[3]]: {
      id: allIds[3],
      isDone: false,
      text: 'Stuff foo into bar'
    }
  },
  allIds: allIds
};

export function todosReducer(
  state = initialState,
  action: TodosActionTypes
): TodosState {
  switch (action.type) {
    case TodosActions.ToggleTodo:
      const idToAdd = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [idToAdd]: {
            ...state.byIds[idToAdd],
            isDone: !state.byIds[idToAdd].isDone
          }
        }
      };

    case TodosActions.ToggleAll:
      return {
        ...state,
        byIds: state.allIds.reduce(
          (byIds, id) => {
            byIds[id] = {
              id,
              isDone: !state.byIds[id].isDone,
              text: state.byIds[id].text
            };

            return byIds;
          },
          {} as TodosMap
        )
      };

    case TodosActions.AddTodo:
      const todo = action.payload;
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

    case TodosActions.DeleteTodo:
      const idToDelete = action.payload;

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [idToDelete]: undefined
        },
        allIds: state.allIds.filter(id => id !== idToDelete)
      };

    default:
      return state;
  }

  // TODO: generate random uuids instead of incremental integers
  function getNewTodoId(): string {
    return uuid();
  }
}
