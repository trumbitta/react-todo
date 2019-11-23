/** @format */

// App Libraries
import { Todo } from '@todo/shared-models';

// App Page Objects
import { TodoPage } from '../support/todo-page.po';

describe('Todo page', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();

    page.seedAndVisit();
  });

  it('should display the todo details card', () => {
    page
      .getTodoCard()
      .as('todoCard')
      .should('exist');

    cy.fixture('todo').then((todo: Todo) => {
      cy.get('@todoCard').should('contain.text', todo.createdAt);
      cy.get('@todoCard').should('contain.text', todo.id);
      cy.get('@todoCard').should('contain.text', todo.text);
      cy.get('@todoCard').should('contain.text', todo.updatedAt);
    });
  });

  it('should display a link to get back to the list of todos', () => {
    page
      .getBackToListLink()
      .as('backToList')
      .should('exist');

    cy.route('GET', 'http://localhost:3333/api/v1/todos', 'fixture:todos.json').as('getTodos');
    cy.get('@backToList').click();
    cy.wait('@getTodos');
    cy.url().should('eq', 'http://localhost:4200/todos');
  });
});
