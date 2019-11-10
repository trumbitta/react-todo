/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { selectTodosAllIds } from './redux/todos.selectors';
import {
  toggleTodo,
  addTodo,
  deleteTodo,
  toggleAll
} from './redux/todos.slice';

// App Components
import { TodosActionBar } from './todos-action-bar/todos-action-bar.component';
import { TodoAdd, FormikSubmitProps } from './todo-add/todo-add.component';
import { TodoItem } from './todo-item/todo-item.component';

// App Models
import { Todo } from './todo.model';

export const Todos: FunctionComponent = () => {
  const todosIds = useSelector(selectTodosAllIds);

  const dispatch = useDispatch();
  const dispatchToggleTodo = (id: string) => dispatch(toggleTodo(id));

  const dispatchAddTodo: FormikSubmitProps<Todo> = (
    todo: Todo,
    { setSubmitting }
  ) => {
    dispatch(addTodo(todo));

    setSubmitting(false);
  };

  const dispatchDeleteTodo = (id: string) => dispatch(deleteTodo(id));

  const dispatchToggleAll = () => dispatch(toggleAll());

  return (
    <section>
      <TodosActionBar onToggleAll={dispatchToggleAll} />

      <ul>
        {todosIds.map(id => (
          <li key={id}>
            <TodoItem
              id={id}
              onToggleIsDone={dispatchToggleTodo}
              onDeleteTodo={dispatchDeleteTodo}
            />
          </li>
        ))}
        <li>
          <TodoAdd onAddTodo={dispatchAddTodo} />
        </li>
      </ul>
    </section>
  );
};
