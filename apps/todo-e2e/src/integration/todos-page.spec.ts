/** @format */

// App Page Objects
import { TodosPage } from '../support/todos-page.po';

describe('Todos page', () => {
  let page: TodosPage;

  context('When starting with empty data', () => {
    beforeEach(() => {
      page = new TodosPage();

      page.seedAndVisit([]);
    });

    it('should load no list', () => {
      page.getTodoList().should('have.length', 1);
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
});
