/** @format */

import React from 'react';

// Third Parties
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

// App Components
import { Todos } from './todos/todos.component';
import { TodoDetails } from './todos/todo-details/todo-details.component';

// App Configurations
import { routePaths } from './config/app.config';

export const App = () => {
  return <MainStyled>{fragmentRoutes}</MainStyled>;
};

const MainStyled = styled.main`
  width: 80%;
  margin: 1rem auto;
`;

const fragmentRoutes = (
  <Switch>
    <Route path={`${routePaths.todos}/:id`}>
      <TodoDetails />
    </Route>

    <Route path={`${routePaths.todos}`}>
      <Todos />
    </Route>

    <Route path="/">
      <Redirect to={`${routePaths.todos}`} />
    </Route>
  </Switch>
);
