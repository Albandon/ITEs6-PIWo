describe('main page test', () => {
  beforeEach(()=> {
    cy.visit('https://libeer-1e1a1.firebaseapp.com');
  });
  it('renderes the correct page', () => {
    cy.get('#filter-price').should('exist');
  });

  it('filters data based on search', () => {
    cy.get('.search-bar').find('input').type('Wiedźmin');

    cy.wait(100);

    cy.get('.book-list-container').children('.book-item').should('have.length', 1);
    
  });

  it('not owner can not edit or delete', () => {
    cy.get('.book-down-button-container').should('not.exist')

  });

});

describe('add new book', () => {
  it('user can register/login', () => {
    cy.visit('https://libeer-1e1a1.firebaseapp.com/Login');

    cy.get('input[type="email"]').type('cypress@gmail.com');

    cy.get('input[type="password"]').type('testowe123');

    cy.wait(100);

    cy.get('.small-button').click();

    cy.wait(1000);

    cy.get('.top-text').should('contain', 'Wyloguj');
  });

  it('logged user can add book', () => {
    cy.visit('https://libeer-1e1a1.firebaseapp.com/New');

    cy.get('#book-add-title').type('testowa książka');
    cy.get('#book-add-Author').type('testowy autor');
    cy.get('#book-add-description').type('testowy opis');
    cy.get('#book-add-price').type('10');
    cy.get('#book-add-page-number').type('260');
    cy.get('#filter-cover').select('soft');

    cy.wait(100);

    cy.get('button[type="submit"]').click();

    cy.wait(100);

    cy.get('#book-add-title').should('have.value', '');
    cy.get('.logo-image').click();
    cy.get('.search-bar').find('input').type('testowa książka');
    cy.get('.book-item .book-title').should('contain', 'testowa książka');
  });

  it('book can be deleted', () => {
    cy.visit('https://libeer-1e1a1.firebaseapp.com/')
    cy.get('.book-item').contains('.book-title', 'testowa książka')
    .parents('.book-item')
    .find('button')
    .contains('Usuń')
    .click();

    cy.get('.book-item .book-title').should('not.contain', 'testowa książka');
  });

});