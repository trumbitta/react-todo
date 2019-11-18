/** @format */

import React, { FunctionComponent } from 'react';

// App Components
import { FormikSubmitProps, TodoAdd } from '../todo-add/todo-add.component';
import { TodoItem } from '../todo-item/todo-item.component';

// App Libraries
import { Todo } from '@todo/shared-models';

export const TodosList: FunctionComponent<TodosListProps> = ({
  todos,
  dispatchAddTodo,
  dispatchDeleteTodo,
  dispatchToggleTodo,
}) => (
  <ul>
    {todos.map((todo: Todo, index: number) => (
      <li key={todo.id}>
        <TodoItem
          todo={todo}
          onToggleIsDone={dispatchToggleTodo}
          onDeleteTodo={dispatchDeleteTodo}
          index={index}
        />
      </li>
    ))}
    <li>
      <TodoAdd onAddTodo={dispatchAddTodo} />
    </li>
  </ul>
);

interface TodosListProps {
  todos: Todo[];
  dispatchToggleTodo: (id: string) => void;
  dispatchDeleteTodo: (id: string) => void;
  dispatchAddTodo: FormikSubmitProps<Todo>;
}
