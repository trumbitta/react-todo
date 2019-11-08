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
  const toggleIsDone = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();

    onToggleIsDone(id);
  };

  const deleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onDeleteTodo(id);
  };

  return (
    <span onClick={toggleIsDone}>
      [{todo.isDone ? 'x' : ' '}] <code>{id}</code> • {todo.text}{' '}
      <button type="button" onClick={deleteTodo}>
        Delete
      </button>
    </span>
  );
};

interface TodoItemProps {
  id: string;
  onToggleIsDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}
