/** @format */

import React, { FunctionComponent } from 'react';

// App Libraries
import { Todo } from '@todo/shared-models';

export const TodoDetails: FunctionComponent<TodoDetailsProps> = ({ todo }) => {
  return (
    <article>
      <h1>Todo details</h1>

      <aside>
        <p>id: {todo.id}</p>
        <p>created: {todo.createdAt}</p>
        <p>completed: {todo.isDone.toString()}</p>
      </aside>
      <p>
        {todo.text} <small>last updated: {todo.updatedAt}</small>
      </p>
    </article>
  );
};

interface TodoDetailsProps {
  todo: Todo;
}
