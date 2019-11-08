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
    <span onClick={toggleIsDone}>
      [{todo.isDone ? 'x' : ' '}] <code>{todo.id}</code> • {todo.text}
    </span>
  );
};

interface TodoItemProps {
  id: string;
  onToggleIsDone?: (id: string) => void;
}
