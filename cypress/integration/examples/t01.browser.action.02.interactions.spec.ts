// Mocha
// describe is a way to group tests in Mocha

describe('browser-actions 01_02 ', () => {
  it('should load scrap books website', () => {
    cy.visit('http://books.toscrape.com/index.html', { timeout: 10000 });
    cy.url().should('include', 'index.html');
  });

  it('should click on travel category', () => {
    cy.get('a')
      .contains('Travel')
      .click();
    cy.url().should('include', 'travel');
    // cy.get('h1').contains('Travel');
    cy.get('.page-header.action>h1').contains('Travel');
    cy.get('.page-header.action h1').contains('Travel');
  });

  it('should travel category contain > 0 books', () => {
    // cy.get('h1').contains('Travel');
    cy.get('.product_pod')
      // .its('length').should('eq', 11)
      .its('length')
      .should('be.gte', 11);
    // .should('have.length.gte', 11);
    // .should('have.length.gt', 0);
  });
});

describe('browser-actions 01_02_01 ', () => {
  it('price of poetry olio book is €23.88', () => {
    cy.visit('http://books.toscrape.com/index.html', { timeout: 10000 });
    cy.url().should('include', 'index.html');

    cy.log(' *** website loaded!');

    cy.get('a')
      .contains('Poetry')
      .click();

    cy.get('.page-header.action>h1').contains('Poetry');

    cy.get('.product_pod h3 a')
      .contains('Olio')
      .click();

    cy.url().should('include', 'catalogue/olio');

    cy.get('.product_page .product_main .price_color').contains('23.88');
  });
});

describe('browser-actions 01_02_02 refresh the page ', () => {
  it('price of poetry olio book is €23.88', () => {
    cy.visit('http://books.toscrape.com/index.html', { timeout: 10000 });
    cy.url().should('include', 'index.html');

    cy.log(' *** before reload data is there');
    cy.reload();
    cy.log(' *** after reload, is data still there?');
  });
});
