/** @format */

// Third Parties
import { ofType } from 'redux-observable';

// RxJS
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError } from 'rxjs/operators';

// Redux
import { loadTodos, loadTodosSuccess, loadTodosError } from './todos.slice';

// App Endpoints
import { apiEndpointTodos } from '../../config/api.config';

// App Libraries
import { TodosMap, ApiError } from '@todo/shared-models';

export const loadTodosEpic = action$ =>
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
