/** @format */

import React from 'react';

// Third Parties
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Redux
import { selectTodosCurrentArray } from './todos/redux/todos.selectors';

// App Components
import { Todos } from './todos/todos.component';

export const App = () => {
  const todos = useSelector(selectTodosCurrentArray);

  const addTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log('Adding todo');
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
