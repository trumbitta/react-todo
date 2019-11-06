import React, { FunctionComponent, useState } from 'react';

// App Models
import { Todo } from '../todo.model';

export const TodoItem: FunctionComponent<TodoItemProps> = ({ todo }) => {
  const [isDone, setIsDone] = useState(todo.isDone);

  const toggleIsDone = () => setIsDone(!isDone);

  return (
    <li onClick={toggleIsDone}>
      [{isDone ? 'x' : ' '}] {todo.id} • {todo.text}
    </li>
  );
};

interface TodoItemProps {
  todo: Todo;
  onChangeisDone?: (event: React.MouseEvent<HTMLLIElement>) => void;
}
