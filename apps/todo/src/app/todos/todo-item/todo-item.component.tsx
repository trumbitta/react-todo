/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { Link } from 'react-router-dom';

// App Configurations
import { routePaths } from '../../config/app.config';

// App Libraries
import { Todo } from '@todo/shared-models';

const TodoItem_: FunctionComponent<TodoItemProps> = ({ todo, onToggleIsDone, onDeleteTodo }) => {
  const toggleIsDone = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();

    onToggleIsDone(todo.id);
  };

  const deleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onDeleteTodo(todo.id);
  };

  const fragmentIsDone = <code onClick={toggleIsDone}>[{todo.isDone ? 'x' : ' '}]</code>;
  const fragmentIdText = (
    <Link to={`${routePaths.todos}/${todo.id}`}>
      <code>{todo.id}</code> • {todo.text}
    </Link>
  );

  return (
    <>
      {fragmentIsDone} {fragmentIdText}{' '}
      <button type="button" onClick={deleteTodo}>
        Delete
      </button>
    </>
  );
};

interface TodoItemProps {
  todo: Todo;
  onToggleIsDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoItem = React.memo(TodoItem_);
