/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { todoActionCreators } from './redux/todos.actions';
import { selectTodosAllIds } from './redux/todos.selectors';

// App Components
import { TodoItem } from './todo-item/todo-item.component';

export const Todos: FunctionComponent = () => {
  const todosIds = useSelector(selectTodosAllIds);

  const dispatch = useDispatch();
  const dispatchToggleTodo = (id: number) =>
    dispatch(todoActionCreators.toggleTodo(id));

  return (
    <ul>
      {todosIds.map(id => (
        <TodoItem key={id} id={id} onToggleIsDone={dispatchToggleTodo} />
      ))}
    </ul>
  );
};
