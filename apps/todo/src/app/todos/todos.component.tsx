import React, { FunctionComponent } from 'react';

// App Models
import { Todo } from './todo.model';
import { TodoItem } from './todo-item/todo-item.component';

export const Todos: FunctionComponent<TodosProps> = ({ todos, onAddTodo }) => {
  return (
    <>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
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
