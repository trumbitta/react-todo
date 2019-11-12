/** @format */

// Third Parties
import { Action } from 'redux';
import { ofType, ActionsObservable } from 'redux-observable';

// RxJS
import { of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { switchMap, map, catchError, pluck, tap } from 'rxjs/operators';

// Redux
import {
  loadTodos,
  loadTodosSuccess,
  loadTodosError,
  addTodo,
  addTodoSuccess,
  addTodoError,
} from './todos.slice';

// App Endpoints
import { apiEndpointTodos } from '../../config/api.config';

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
    switchMap(todo =>
      ajax.post(apiEndpointTodos, todo).pipe(
        map(ajaxResponse => ajaxResponse.response),
        map((newTodo: Todo) => addTodoSuccess(newTodo)),
        catchError(error => {
          return of(addTodoError<ApiError>(error.response));
        })
      )
    )
  );
