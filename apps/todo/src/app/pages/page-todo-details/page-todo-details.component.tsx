/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

// Redux
import { selectTodosSelected } from '../../todos/redux/todos.selectors';
import { todosActions } from '../../todos/redux/todos.slice';

// App Components
import { TodoDetails } from '../../todos/todo-details/todo-details.component';

// App Configurations
import { routePaths } from '../../config/app.config';

// App Libraries
import { useMountEffect } from '@todo/utils';

export const PageTodoDetails: FunctionComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedTodo = useSelector(selectTodosSelected);

  useMountEffect(() => {
    dispatch(todosActions.selectTodo(id));
  });

  return (
    <>
      <Link to={routePaths.todos}>Back to todos list</Link>

      <TodoDetails todo={selectedTodo} />
    </>
  );
};
