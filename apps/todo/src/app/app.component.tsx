import React, { useState } from 'react';

import styled from 'styled-components';

// App Components
import { Todos } from './todos/todos.component';

// App Models
import { Todo } from './todos/todo.model';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      isDone: false,
      text: 'Add foo'
    },
    {
      id: 2,
      isDone: false,
      text: 'Call bar'
    },
    {
      id: 3,
      isDone: false,
      text: 'Drink baz'
    }
  ]);

  const addTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setTodos([
      ...todos,
      { id: todos[todos.length - 1].id + 1, isDone: false, text: 'Foo bar baz' }
    ]);
  };

  return (
    <MainStyled>
      <Todos todos={todos} onAddTodo={addTodo} />
    </MainStyled>
  );
};

const MainStyled = styled.main`
  width: 80%;
  margin: 1rem auto;
`;

export default App;
