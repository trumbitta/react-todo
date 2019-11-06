import { getGreeting } from '../support/app.po';

describe('todo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to todo!');
  });
});
