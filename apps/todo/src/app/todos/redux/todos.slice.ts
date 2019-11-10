/** @format */

// Third Parties
import { createSlice, PayloadAction } from 'redux-starter-kit';
import * as uuid from 'uuid';

// App Models
import { TodosMap, Todo } from '../todo.model';

export interface TodosState {
  byIds: TodosMap;
  allIds: string[];
}

const allIds: string[] = [
  getNewTodoId(),
  getNewTodoId(),
  getNewTodoId(),
  getNewTodoId()
];

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

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTodo(state, action: PayloadAction<string>) {
      const id = action.payload;

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
    },

    toggleAll(state) {
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
    },

    addTodo(state, action: PayloadAction<Todo>) {
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
    },

    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: undefined
        },
        allIds: state.allIds.filter(itemId => itemId !== id)
      };
    }
  }
});

function getNewTodoId(): string {
  return uuid();
}

export const {
  addTodo,
  deleteTodo,
  toggleAll,
  toggleTodo
} = todosSlice.actions;
export const { reducer: todosReducer, name: todosFeatureName } = todosSlice;
