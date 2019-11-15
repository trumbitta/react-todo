/** @format */

// Third Parties
import { Action } from 'redux';
import { ofType, ActionsObservable, StateObservable } from 'redux-observable';

// RxJS
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError, pluck, withLatestFrom } from 'rxjs/operators';

// Redux
import { AppState } from '../../redux/store';
import {
  loadTodos,
  loadTodosSuccess,
  loadTodosError,
  addTodo,
  addTodoSuccess,
  addTodoError,
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoError,
  toggleTodo,
  toggleTodoSuccess,
  toggleTodoError,
  toggleAll,
  toggleAllSuccess,
  toggleAllError,
} from './todos.slice';

// App Endpoints
import {
  apiEndpointTodos,
  apiEndpointTodosSingle,
  apiEndpointTodosToggleAll,
} from '../../config/api.config';

// App Libraries
import { TodosMap, ApiError, Todo } from '@todo/shared-models';

export const loadTodosEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(loadTodos.type),
    switchMap(() =>
      ajax.getJSON<TodosMap>(apiEndpointTodos).pipe(
        map(todosMap => loadTodosSuccess<TodosMap>(todosMap)),
        catchError(error => {
          return of(loadTodosError<ApiError>(error.response));
        })
      )
    )
  );

export const addTodoEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(addTodo.type),
    pluck('payload'),
    switchMap((todo: Todo) =>
      ajax
        .post(apiEndpointTodos, todo, {
          'Content-Type': 'application/json',
        })
        .pipe(
          map(ajaxResponse => ajaxResponse.response),
          map((newTodo: Todo) => addTodoSuccess(newTodo)),
          catchError(error => {
            return of(addTodoError<ApiError>(error.response));
          })
        )
    )
  );

export const deleteTodoEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(deleteTodo.type),
    pluck('payload'),
    switchMap((id: string) =>
      ajax.delete(apiEndpointTodosSingle.replace(':id', id)).pipe(
        map(() => deleteTodoSuccess(id)),
        catchError(error => {
          return of(deleteTodoError<ApiError>(error.response));
        })
      )
    )
  );

export const toggleTodoEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(toggleTodo.type),
    pluck('payload'),
    withLatestFrom(state$),
    map(([id, state]) => [id as string, state.todos.byIds[id as string]]),
    map(data => [data[0] as string, { ...(data[1] as Todo), isDone: !(data[1] as Todo).isDone }]),
    switchMap(data =>
      ajax
        .put(apiEndpointTodosSingle.replace(':id', data[0] as string), data[1] as Todo, {
          'Content-Type': 'application/json',
        })
        .pipe(
          map(ajaxResponse => ajaxResponse.response),
          map((todo: Todo) => toggleTodoSuccess(todo)),
          catchError(error => of(toggleTodoError<ApiError>(error.response)))
        )
    )
  );

export const toggleAllEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(toggleAll.type),
    switchMap(() =>
      ajax.post(apiEndpointTodosToggleAll, { 'Content-Type': 'application/json' }).pipe(
        map(ajaxResponse => ajaxResponse.response),
        map((todosMap: TodosMap) => toggleAllSuccess(todosMap)),
        catchError(error => of(toggleAllError<ApiError>(error.response)))
      )
    )
  );
