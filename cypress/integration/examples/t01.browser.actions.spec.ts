// Mocha
// describe is a way to group tests in Mocha

describe('browser-actions 01_01 simple test with cypress', () => {
  // test step unit
  // do not go beyond 8 per describe to ease debugging

  it('should load correct url', () => {
    cy.visit('http://localhost:4200');
  });

  it('should load in less than 10s', () => {
    cy.visit('http://localhost:4200', { timeout: 10000 });
  });

  it('should check correct url', () => {
    cy.url().should('include', 'localhost');
  });

  it('should check correct element on page: div.toolbar', () => {
    cy.get('.toolbar').should('be.visible');
  });
});

describe('browser-actions 01_02 ', () => {
  it('should load scrap books website', () => {
    cy.visit('http://books.toscrape.com/index.html', { timeout: 10000 });
    cy.url().should('include', 'index.html');
  });
});
