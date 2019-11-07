/** @format */

import React, { FunctionComponent, useState } from 'react';

// App Models
import { Todo } from '../todo.model';

export const TodoItem: FunctionComponent<TodoItemProps> = ({
  todo,
  onToggleIsDone
}) => {
  const [isDone, setIsDone] = useState(todo.isDone);

  const toggleIsDone = () => onToggleIsDone(todo.id);

  return (
    <li onClick={toggleIsDone}>
      [{isDone ? 'x' : ' '}] {todo.id} • {todo.text}
    </li>
  );
};

interface TodoItemProps {
  todo: Todo;
  onToggleIsDone?: (id: number) => void;
}
