/** @format */

import React, { FunctionComponent } from 'react';

// Third Parties
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

// Redux
import { selectTodosByIdsAsArray } from '../../todos/redux/todos.selectors';
import { todosActions } from '../../todos/redux/todos.slice';

// App Components
import { TodosActionBar } from '../../todos/todos-action-bar/todos-action-bar.component';
import { TodosList } from '../../todos/todos-list/todos-list.component';

// App Libraries
import { Todo, TodosMap } from '@todo/shared-models';
import { useMountEffect } from '@todo/utils';

// App Models
import { FormikSubmitProps } from '../../todos/todo-add/todo-add.component';

export const PageTodos: FunctionComponent = () => {
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(todosActions.loadTodos());
  });
  const todos = useSelector(selectTodosByIdsAsArray);

  const dispatchToggleTodo = (id: string) => dispatch(todosActions.toggleTodo(id));
  const dispatchAddTodo: FormikSubmitProps<Todo> = (todo: Todo, { setSubmitting }) => {
    dispatch(todosActions.addTodo(todo));

    setSubmitting(false);
  };
  const dispatchDeleteTodo = (id: string) => dispatch(todosActions.deleteTodo(id));
  const dispatchToggleAll = () => dispatch(todosActions.toggleAll());
  const dispatchDeleteAll = () => dispatch(todosActions.deleteAll());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const sortedTodos: Todo[] = reorder(todos, result.source.index, result.destination.index);

    dispatch(todosActions.reorderTodos(TodosMap.fromTodosArray(sortedTodos)));
  };

  return (
    <section>
      <TodosActionBar onToggleAll={dispatchToggleAll} onDeleteAll={dispatchDeleteAll} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TodosList
                todos={todos}
                dispatchAddTodo={dispatchAddTodo}
                dispatchDeleteTodo={dispatchDeleteTodo}
                dispatchToggleTodo={dispatchToggleTodo}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

function reorder(todos: Todo[], startIndex: number, endIndex: number) {
  const result = Array.from(todos);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
