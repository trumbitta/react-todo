/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useSelector } from 'react-redux';

// Redux
import { makeSelectTodosTodoById } from '../redux/todos.selectors';

export const TodoItem: FunctionComponent<TodoItemProps> = ({
  id,
  onToggleIsDone
}) => {
  const todo = useSelector(makeSelectTodosTodoById(id));
  const toggleIsDone = () => onToggleIsDone(id);

  return (
    <li onClick={toggleIsDone}>
      [{todo.isDone ? 'x' : ' '}] {todo.id} • {todo.text}
    </li>
  );
};

interface TodoItemProps {
  id: number;
  onToggleIsDone?: (id: number) => void;
}
