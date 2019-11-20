/** @format */

// App Libraries
import { Todo } from '@todo/shared-models';

export class TodosPage {
  seedAndVisit(data: Todo[] | string = 'fixture:todos.json') {
    cy.server();
    cy.route('GET', 'http://localhost:3333/api/v1/todos', data);
    cy.visit('/');
  }

  getTodoList() {
    return cy.get('ul li');
  }

  getAddInput() {
    return cy.get('input[type="text"]');
  }

  getAddButton() {
    return cy.get('form button[type="submit"]');
  }

  addTodo(text: string = 'Foo bar baz') {
    cy.route('POST', 'http://localhost:3333/api/v1/todos', 'fixture:todo');

    this.getAddInput()
      .type(text)
      .type('{enter}');
  }
}
