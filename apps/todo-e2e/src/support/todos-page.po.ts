/** @format */

// App Libraries
import { Todo } from '@todo/shared-models';

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

  getAddInput() {
    return cy.get('input[type="text"]');
  }

  getAddButton() {
    return this.getAddTodoComponent().find('button[type="submit"]');
  }

  getAddTodoComponent() {
    return cy.get('form');
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

      return this.getTodoList()
        .first()
        .find('button')
        .click();
    });
  }
}
