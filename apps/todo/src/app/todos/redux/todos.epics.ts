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
import { todosActions } from './todos.slice';

// App Endpoints
import {
  apiEndpointTodos,
  apiEndpointTodosSingle,
  apiEndpointTodosToggleAll,
  apiEndpointTodosDeleteAll,
} from '../../config/api.config';

// App Libraries
import { TodosMap, ApiError, Todo } from '@todo/shared-models';

export const loadTodosEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(todosActions.loadTodos.type),
    switchMap(() =>
      ajax.getJSON<TodosMap>(apiEndpointTodos).pipe(
        map(todosMap => todosActions.loadTodosSuccess<TodosMap>(todosMap)),
        catchError(error => of(todosActions.loadTodosError<ApiError>(error.response)))
      )
    )
  );

export const selectTodoEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(todosActions.selectTodo.type),
    pluck('payload'),
    switchMap((id: string) =>
      ajax.getJSON<Todo>(apiEndpointTodosSingle.replace(':id', id)).pipe(
        map(todo => todosActions.selectTodoSuccess(todo)),
        catchError(error => of(todosActions.selectTodoError<ApiError>(error.response)))
      )
    )
  );

export const addTodoEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(todosActions.addTodo.type),
    pluck('payload'),
    switchMap((todo: Todo) =>
      ajax
        .post(apiEndpointTodos, todo, {
          'Content-Type': 'application/json',
        })
        .pipe(
          map(ajaxResponse => ajaxResponse.response),
          map((newTodo: Todo) => todosActions.addTodoSuccess(newTodo)),
          catchError(error => of(todosActions.addTodoError<ApiError>(error.response)))
        )
    )
  );

export const deleteTodoEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(todosActions.deleteTodo.type),
    pluck('payload'),
    switchMap((id: string) =>
      ajax.delete(apiEndpointTodosSingle.replace(':id', id)).pipe(
        map(() => todosActions.deleteTodoSuccess(id)),
        catchError(error => of(todosActions.deleteTodoError<ApiError>(error.response)))
      )
    )
  );

export const deleteAllEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(todosActions.deleteAll.type),
    switchMap(() =>
      ajax.post(apiEndpointTodosDeleteAll).pipe(
        map(() => todosActions.deleteAllSuccess()),
        catchError(error => of(todosActions.deleteAllError<ApiError>(error.response)))
      )
    )
  );

export const toggleTodoEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(todosActions.toggleTodo.type),
    pluck('payload'),
    withLatestFrom(state$),
    map(([id, state]) => [id as string, state.todos.byIds[id as string]]),
    switchMap(data =>
      ajax
        .put(apiEndpointTodosSingle.replace(':id', data[0] as string), data[1] as Todo, {
          'Content-Type': 'application/json',
        })
        .pipe(
          map(ajaxResponse => ajaxResponse.response),
          map((todo: Todo) => todosActions.toggleTodoSuccess(todo)),
          catchError(error => of(todosActions.toggleTodoError<ApiError<Todo>>(error.response)))
        )
    )
  );

export const toggleAllEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(todosActions.toggleAll.type),
    switchMap(() =>
      ajax.post(apiEndpointTodosToggleAll, { 'Content-Type': 'application/json' }).pipe(
        map(ajaxResponse => ajaxResponse.response),
        map((todosMap: TodosMap) => todosActions.toggleAllSuccess(todosMap)),
        catchError(error => of(todosActions.toggleAllError<ApiError>(error.response)))
      )
    )
  );
