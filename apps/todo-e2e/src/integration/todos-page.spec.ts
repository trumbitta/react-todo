/** @format */

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
      page.getTodoList().should('have.length', 1);
    });

    it('should show the "add todo" component', () => {
      page.getAddTodoComponent().should('exist');
    });

    context('When adding todos', () => {
      beforeEach(() => {
        page.addTodo();
      });

      it('should be able to add a todo', () => {
        page.getTodoList().should('have.length', 2);
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
      page.getTodoList().should('have.length', 3);
    });

    it.only('should be able to delete a todo', () => {
      page.getTodoList().should('have.length', 3);

      page.deleteFirstTodo();

      cy.wait('@deleteTodo');
      page.getTodoList().should('have.length', 2);
    });
  });
});
