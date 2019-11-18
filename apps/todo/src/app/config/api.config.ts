/** @format */

// App Environment
import { apiBaseUrl } from '../../environments/environment';

export const apiEndpointTodos = [apiBaseUrl, 'todos'].join('/');

export const apiEndpointTodosSingle = [apiEndpointTodos, ':id'].join('/');

export const apiEndpointTodosRpc = [apiEndpointTodos, 'rpc'].join('/');
export const apiEndpointTodosToggleAll = [apiEndpointTodosRpc, 'toggle-all'].join('/');
export const apiEndpointTodosDeleteAll = [apiEndpointTodosRpc, 'delete-all'].join('/');
export const apiEndpointTodosUpdateAll = [apiEndpointTodosRpc, 'update-all'].join('/');
