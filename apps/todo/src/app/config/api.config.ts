/** @format */

// App Environment
import { apiBaseUrl } from '../../environments/environment';

export const apiEndpointTodos = [apiBaseUrl, 'todos'].join('/');

export const apiEndpointTodosSingle = [apiEndpointTodos, ':id'].join('/');
