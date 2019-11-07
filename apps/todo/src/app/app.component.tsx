/** @format */

import React from 'react';

// Third Parties
import styled from 'styled-components';

// App Components
import { Todos } from './todos/todos.component';

export const App = () => {
  return (
    <MainStyled>
      <Todos />
    </MainStyled>
  );
};

const MainStyled = styled.main`
  width: 80%;
  margin: 1rem auto;
`;

export default App;
