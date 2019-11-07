/** @format */

import React, { FunctionComponent } from 'react';

// App Models
import { Todo } from '../todo.model';

export const TodoItem: FunctionComponent<TodoItemProps> = ({
  todo,
  onToggleIsDone
}) => {
  const toggleIsDone = () => onToggleIsDone(todo.id);

  return (
    <li onClick={toggleIsDone}>
      [{todo.isDone ? 'x' : ' '}] {todo.id} • {todo.text}
    </li>
  );
};

interface TodoItemProps {
  todo: Todo;
  onToggleIsDone?: (id: number) => void;
}
