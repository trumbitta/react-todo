/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { todoActionCreators } from './redux/todos.actions';
import { selectTodosAllIds } from './redux/todos.selectors';

// App Components
import { TodoAdd, FormikSubmitProps } from './todo-add/todo-add.component';
import { TodoItem } from './todo-item/todo-item.component';

// App Models
import { Todo } from './todo.model';

export const Todos: FunctionComponent = () => {
  const todosIds = useSelector(selectTodosAllIds);

  const dispatch = useDispatch();
  const dispatchToggleTodo = (id: string) =>
    dispatch(todoActionCreators.toggleTodo(id));

  const dispatchAddTodo: FormikSubmitProps<Todo> = (
    todo: Todo,
    { setSubmitting }
  ) => {
    dispatch(todoActionCreators.addTodo(todo));

    setSubmitting(false);
  };

  return (
    <ul>
      {todosIds.map(id => (
        <li key={id}>
          <TodoItem id={id} onToggleIsDone={dispatchToggleTodo} />
        </li>
      ))}
      <li>
        <TodoAdd onAddTodo={dispatchAddTodo} />
      </li>
    </ul>
  );
};
