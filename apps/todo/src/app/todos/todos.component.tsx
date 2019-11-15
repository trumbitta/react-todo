/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { selectTodosByIdsAsArray } from './redux/todos.selectors';
import { todosActions } from './redux/todos.slice';

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
  const dispatchToggleTodo = (id: string) => dispatch(todosActions.toggleTodo(id));

  const dispatchAddTodo: FormikSubmitProps<Todo> = (todo: Todo, { setSubmitting }) => {
    dispatch(todosActions.addTodo(todo));

    setSubmitting(false);
  };

  const dispatchDeleteTodo = (id: string) => dispatch(todosActions.deleteTodo(id));

  const dispatchToggleAll = () => dispatch(todosActions.toggleAll());

  const dispatchDeleteAll = () => dispatch(todosActions.deleteAll());

  useMountEffect(() => {
    dispatch(todosActions.loadTodos());
  });

  return (
    <section>
      <TodosActionBar onToggleAll={dispatchToggleAll} onDeleteAll={dispatchDeleteAll} />

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
