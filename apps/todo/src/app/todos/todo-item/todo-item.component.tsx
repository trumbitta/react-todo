/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useSelector } from 'react-redux';

// Redux
import { makeSelectTodosTodoById } from '../redux/todos.selectors';

export const TodoItem: FunctionComponent<TodoItemProps> = ({
  id,
  onToggleIsDone,
  onDeleteTodo
}) => {
  const todo = useSelector(makeSelectTodosTodoById(id));
  const toggleIsDone = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onToggleIsDone(id);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onDeleteTodo(id);
  };

  return (
    <span onClick={toggleIsDone}>
      [{todo.isDone ? 'x' : ' '}] <code>{id}</code> • {todo.text}{' '}
      <button onClick={handleOnClick}></button>
    </span>
  );
};

interface TodoItemProps {
  id: string;
  onToggleIsDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}
