/** @format */

// App Models
import { Todo } from './todo.model';

export class TodosMap {
  [id: string]: Todo;

  static fromTodosArray(todos: Todo[]): TodosMap {
    return todos.reduce(
      (todosMap, todo) => {
        todosMap[todo.id] = todo;

        return todosMap;
      },
      {} as TodosMap
    );
  }

  static toTodosArray(todosMap: TodosMap): Todo[] {
    return Object.keys(todosMap).map(id => todosMap[id]);
  }
}
