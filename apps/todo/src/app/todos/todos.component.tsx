/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useDispatch } from 'react-redux';

// Redux
import { todoActionCreators } from './redux/todos.actions';

// App Models
import { Todo } from './todo.model';

// App Components
import { TodoItem } from './todo-item/todo-item.component';

export const Todos: FunctionComponent<TodosProps> = ({ todos, onAddTodo }) => {
  const dispatch = useDispatch();
  const dispatchToggleTodo = (id: number) =>
    dispatch(todoActionCreators.toggleTodo(id));

  return (
    <>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleIsDone={dispatchToggleTodo}
          />
        ))}
      </ul>

      <button onClick={onAddTodo}>+ Add todo</button>
    </>
  );
};

interface TodosProps {
  todos: Todo[];
  onAddTodo: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
