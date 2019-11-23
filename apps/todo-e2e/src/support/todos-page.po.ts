/** @format */

// App Libraries
import { Todo, TodosMap } from '@todo/shared-models';

export class TodosPage {
  seedAndVisit(data: Todo[] | string = 'fixture:todos.json') {
    cy.server();
    cy.route('GET', 'http://localhost:3333/api/v1/todos', data).as('getTodos');
    cy.visit('/');
    cy.wait('@getTodos');
  }

  getActionBar() {
    return cy.get('aside');
  }

  getTodoList() {
    return cy.get('ul li');
  }

  getFirstTodo() {
    return this.getTodoList().first();
  }

  getAddInput() {
    return cy.get('input[type="text"]');
  }

  getAddButton() {
    return this.getAddTodoComponent().find('button[type="submit"]');
  }

  getAddTodoComponent() {
    return cy.get('form');
  }

  getLinkToDetailsPage() {
    return this.getFirstTodo().find('a');
  }

  addTodo(text: string = 'Foo bar baz') {
    cy.route('POST', 'http://localhost:3333/api/v1/todos', 'fixture:todo');

    this.getAddInput()
      .type(text)
      .type('{enter}');
  }

  deleteFirstTodo() {
    cy.fixture('todo').then((todo: Todo) => {
      cy.route('DELETE', `http://localhost:3333/api/v1/todos/${todo.id}`, '').as('deleteTodo');

      return this.getFirstTodo()
        .find('button')
        .click();
    });
  }

  deleteAll() {
    cy.fixture('todos').then((todosMap: TodosMap) => {
      cy.route('POST', `http://localhost:3333/api/v1/todos/rpc/delete-all`, {}).as('deleteAll');

      return this.getActionBar()
        .find('button')
        .contains('Delete all')
        .click();
    });
  }

  toggleFirstTodo() {
    cy.fixture('todo').then((todo: Todo) => {
      cy.route('PUT', `http://localhost:3333/api/v1/todos/${todo.id}`, {
        ...todo,
        isDone: !todo.isDone,
      } as Todo).as('toggleTodo');

      return this.getFirstTodo()
        .find('code')
        .click();
    });
  }

  toggleAll() {
    cy.fixture('todos').then((todosMap: TodosMap) => {
      cy.route(
        'POST',
        `http://localhost:3333/api/v1/todos/rpc/toggle-all`,
        Object.keys(todosMap).reduce(
          (map, id) => {
            map[id] = {
              ...todosMap[id],
              isDone: !todosMap[id].isDone,
            };

            return map;
          },
          {} as TodosMap
        )
      ).as('toggleAll');

      return this.getActionBar()
        .find('button')
        .contains('Toggle all')
        .click();
    });
  }

  goToDetailsPage() {
    cy.fixture('todo').then((todo: Todo) => {
      cy.route('GET', `http://localhost:3333/api/v1/todos/${todo.id}`, todo);
    });

    this.getLinkToDetailsPage().click();
  }
}
