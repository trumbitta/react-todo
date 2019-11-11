/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { selectTodosByIdsAsArray } from './redux/todos.selectors';
import { toggleTodo, addTodo, deleteTodo, toggleAll, loadTodos } from './redux/todos.slice';

// App Components
import { TodosActionBar } from './todos-action-bar/todos-action-bar.component';
import { TodoAdd, FormikSubmitProps } from './todo-add/todo-add.component';
import { TodoItem } from './todo-item/todo-item.component';

// App Libraries
import { useMountEffect } from '@todo/utils';
import { Todo } from '@todo/shared-models';

export const Todos: FunctionComponent = () => {
  const todos = useSelector(selectTodosByIdsAsArray);

  const dispatch = useDispatch();
  const dispatchToggleTodo = (id: string) => dispatch(toggleTodo(id));

  const dispatchAddTodo: FormikSubmitProps<Todo> = (todo: Todo, { setSubmitting }) => {
    dispatch(addTodo(todo));

    setSubmitting(false);
  };

  const dispatchDeleteTodo = (id: string) => dispatch(deleteTodo(id));

  const dispatchToggleAll = () => dispatch(toggleAll());

  useMountEffect(() => {
    dispatch(loadTodos());
  });

  return (
    <section>
      <TodosActionBar onToggleAll={dispatchToggleAll} />

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
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
