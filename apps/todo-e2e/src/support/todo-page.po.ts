/** @format */

// App Libraries
import { Todo } from '@todo/shared-models';

export class TodoPage {
  seedAndVisit() {
    cy.server();
    cy.fixture('todo').then((todo: Todo) => {
      cy.route('GET', `http://localhost:3333/api/v1/todos/${todo.id}`, todo).as('getTodo');
      cy.visit(`/todos/${todo.id}`);
      cy.wait('@getTodo');
    });
  }

  getBackToListLink() {
    return cy.get('a').contains('Back to todos list');
  }

  getTodoCard() {
    return cy.get('article');
  }
}
