/** @format */

// App Libraries
import { Todo } from '@todo/shared-models';

// App Page Objects
import { TodosPage } from '../support/todos-page.po';

describe('Todos page', () => {
  let page: TodosPage;

  beforeEach(() => {
    page = new TodosPage();
  });

  context('When starting with empty data', () => {
    beforeEach(() => {
      page.seedAndVisit([]);
    });

    it('should show the "action bar"', () => {
      page.getActionBar().should('exist');
    });

    it('should load no list', () => {
      page.getTodoList().should('have.length', 0);
    });

    it('should show the "add todo" component', () => {
      page.getAddTodoComponent().should('exist');
    });

    it('should have disabled buttons in the action bar', () => {
      page
        .getActionBar()
        .find('button')
        .each(button => {
          cy.wrap(button).should('be.disabled');
        });
    });

    it('should load no list', () => {
      page.getTodoList().should('have.length', 0);
    });

    context('When adding todos', () => {
      beforeEach(() => {
        page.addTodo();
      });

      it('should be able to add a todo', () => {
        page.getTodoList().should('have.length', 1);
      });

      it('should clear the input after adding a todo', () => {
        page.getAddInput().should('have.value', '');
      });
    });
  });

  context('When starting with data', () => {
    beforeEach(() => {
      page.seedAndVisit();
    });

    it('should show a full list of todos', () => {
      page.getTodoList().should('have.length', 2);
    });

    it('should be able to delete a todo', () => {
      page.getTodoList().should('have.length', 2);

      page.deleteFirstTodo();

      cy.wait('@deleteTodo');
      page.getTodoList().should('have.length', 1);
    });

    it('should be able to toggle a todo', () => {
      page
        .getFirstTodo()
        .find('code')
        .as('todoToggler')
        .should('not.contain', 'x');

      page.toggleFirstTodo();

      cy.wait('@toggleTodo');
      cy.get('@todoToggler').should('contain', 'x');
    });

    it('should have a link to go to Todo details page', () => {
      page.getLinkToDetailsPage().should('exist');

      page.goToDetailsPage();

      cy.fixture('todo').then((todo: Todo) => {
        cy.url().should('eq', `http://localhost:4200/todos/${todo.id}`);
      });
    });

    it('should be able to toggle all the todos', () => {
      page.getTodoList().each(todoItem => {
        cy.wrap(todoItem)
          .find('code')
          .should('not.contain', 'x');
      });

      page.toggleAll();

      cy.wait('@toggleAll');
      page.getTodoList().each(todoItem => {
        cy.wrap(todoItem)
          .find('code')
          .should('contain', 'x');
      });
    });

    it('should be able to delete all the todos', () => {
      page.getTodoList().should('have.length.greaterThan', 0);

      page.deleteAll();

      cy.wait('@deleteAll');
      page.getTodoList().should('have.length', 0);

      page
        .getActionBar()
        .find('button')
        .each(button => {
          cy.wrap(button).should('be.disabled');
        });
    });
  });
});
