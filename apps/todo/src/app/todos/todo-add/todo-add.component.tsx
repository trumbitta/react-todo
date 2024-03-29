/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { Formik, Field, Form, FormikHelpers } from 'formik';

// App Libraries
import { Todo, emptyTodo } from '@todo/shared-models';

const TodoAdd_: FunctionComponent<TodoAddProps> = ({ onAddTodo }) => {
  const initialValues: Todo = { ...emptyTodo, id: undefined };

  return (
    <Formik initialValues={initialValues} onSubmit={onAddTodo}>
      <Form>
        <Field name="text" type="text" />
        <button type="submit">+ Add todo</button>
      </Form>
    </Formik>
  );
};

export type FormikSubmitProps<T> = (values: T, formikHelpers: FormikHelpers<T>) => void;

interface TodoAddProps {
  onAddTodo: FormikSubmitProps<Todo>;
}

export const TodoAdd = React.memo(TodoAdd_);
