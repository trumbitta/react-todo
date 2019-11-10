/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { Formik, Field, Form, FormikHelpers } from 'formik';

// App Models
import { Todo } from '../todo.model';

export const TodoAdd: FunctionComponent<TodoAddProps> = React.memo(
  ({ onAddTodo }) => {
    const initialValues: Todo = { text: '' };

    return (
      <Formik initialValues={initialValues} onSubmit={onAddTodo}>
        <Form>
          <Field name="text" type="text" />
          <button type="submit">+ Add todo</button>
        </Form>
      </Formik>
    );
  }
);

export type FormikSubmitProps<T> = (
  values: T,
  setSubmitting: FormikHelpers<T>
) => void;

interface TodoAddProps {
  onAddTodo: FormikSubmitProps<Todo>;
}
