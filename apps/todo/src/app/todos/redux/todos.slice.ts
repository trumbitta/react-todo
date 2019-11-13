/** @format */

// Third Parties
import { createSlice, PayloadAction } from 'redux-starter-kit';

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

    // TODO: implement optimistic update
    toggleTodo(state, action: PayloadAction<string>) {
      return state;
    },
    toggleTodoSuccess(state, action: PayloadAction<Todo>) {
      const todo = action.payload;

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [todo.id]: todo,
        },
      };
    },
    toggleTodoError(state, action: PayloadAction<ApiError>) {
      return state;
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
      // TODO: implement optimistic update
      return state;
    },
    addTodoSuccess(state, action: PayloadAction<Todo>) {
      const todo = action.payload;

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [todo.id]: todo,
        },
        allIds: [...state.allIds, todo.id],
      };
    },
    addTodoError(state, action: PayloadAction<ApiError>) {
      return state;
    },

    deleteTodo(state, action: PayloadAction<string>) {
      // TODO: implement optimistic update

      return state;
    },

    deleteTodoSuccess(state, action: PayloadAction<string>) {
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

    deleteTodoError(state, action: PayloadAction<ApiError>) {
      return state;
    },
  },
});

export const {
  addTodo,
  addTodoError,
  addTodoSuccess,
  deleteTodo,
  deleteTodoError,
  deleteTodoSuccess,
  loadTodos,
  loadTodosError,
  loadTodosSuccess,
  toggleAll,
  toggleTodo,
  toggleTodoError,
  toggleTodoSuccess,
} = todosSlice.actions;

export const { reducer: todosReducer, name: todosFeatureName } = todosSlice;
