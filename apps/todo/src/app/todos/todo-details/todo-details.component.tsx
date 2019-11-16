/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useParams, Link } from 'react-router-dom';

// App Configurations
import { routePaths } from '../../config/app.config';

export const TodoDetails: FunctionComponent = () => {
  const { id } = useParams();

  return (
    <>
      <h1>Hello {id}</h1>

      <Link to={routePaths.todos}>Back to todos list</Link>
    </>
  );
};
