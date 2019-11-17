/** @format */

import React from 'react';

// Third Parties
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

// App Components
import { PageTodos } from './pages/page-todos/page-todos.component';
import { PageTodoDetails } from './pages/page-todo-details/page-todo-details.component';

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
      <PageTodoDetails />
    </Route>

    <Route path={`${routePaths.todos}`}>
      <PageTodos />
    </Route>

    <Route path="/">
      <Redirect to={`${routePaths.todos}`} />
    </Route>
  </Switch>
);
