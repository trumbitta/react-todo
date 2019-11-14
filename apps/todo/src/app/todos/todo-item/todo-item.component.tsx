/** @format */

import React, { FunctionComponent } from 'react';

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

  return (
    <span onClick={toggleIsDone}>
      [{todo.isDone ? 'x' : ' '}] <code>{todo.id}</code> • {todo.text}{' '}
      <button type="button" onClick={deleteTodo}>
        Delete
      </button>
    </span>
  );
};

interface TodoItemProps {
  todo: Todo;
  onToggleIsDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoItem = React.memo(TodoItem_);
