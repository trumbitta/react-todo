/** @format */

// Third Parties
import { createSlice, PayloadAction } from 'redux-starter-kit';
import * as uuid from 'uuid';

// App Libraries
import { Todo, TodosMap, ApiError } from '@todo/shared-models';

export interface TodosState {
  byIds: TodosMap;
  allIds: string[];
}

const initialState: TodosState = {
  byIds: {},
  allIds: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadTodos(state) {
      return state;
    },
    loadTodosSuccess(state, action: PayloadAction<TodosMap>) {
      return {
        ...state,
        byIds: action.payload,
        allIds: Object.keys(action.payload),
      };
    },
    loadTodosError(state, action: PayloadAction<ApiError>) {
      return state;
    },

    toggleTodo(state, action: PayloadAction<string>) {
      const id = action.payload;

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            isDone: !state.byIds[id].isDone,
          },
        },
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
              text: state.byIds[id].text,
            };

            return byIds;
          },
          {} as TodosMap
        ),
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
            text: todo.text,
          },
        },
        allIds: [...state.allIds, newId],
      };
    },

    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: undefined,
        },
        allIds: state.allIds.filter(itemId => itemId !== id),
      };
    },
  },
});

function getNewTodoId(): string {
  return uuid();
}

export const {
  addTodo,
  deleteTodo,
  loadTodos,
  loadTodosSuccess,
  loadTodosError,
  toggleAll,
  toggleTodo,
} = todosSlice.actions;

export const { reducer: todosReducer, name: todosFeatureName } = todosSlice;
