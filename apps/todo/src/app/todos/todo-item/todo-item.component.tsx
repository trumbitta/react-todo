/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

// App Configurations
import { routePaths } from '../../config/app.config';

// App Libraries
import { Todo } from '@todo/shared-models';

const TodoItem_: FunctionComponent<TodoItemProps & { index: number }> = ({
  todo,
  onToggleIsDone,
  onDeleteTodo,
  index,
}) => {
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

  const fragmentTodoItem = (
    <>
      {' '}
      {fragmentIsDone} {fragmentIdText}{' '}
      <button type="button" onClick={deleteTodo}>
        Delete
      </button>
    </>
  );

  return (
    <Draggable draggableId={todo.id} index={index}>
      {provided => (
        <span ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {fragmentTodoItem}
        </span>
      )}
    </Draggable>
  );
};

interface TodoItemProps {
  todo: Todo;
  onToggleIsDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoItem = React.memo(TodoItem_);
