describe('device tests', () => {
  it('iPhone 6', () => {
    cy.viewport('iphone-6');
    cy.visit('http://localhost:4200', { timeout: 10000 });
    cy.url().should('include', 'localhost');
    cy.wait(2000);
  });

  it('iPad Mini', () => {
    cy.viewport('ipad-mini');
    cy.visit('http://localhost:4200', { timeout: 10000 });
    cy.url().should('include', 'localhost');
    cy.wait(2000);
  });

  it('720p', () => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:4200', { timeout: 10000 });
    cy.url().should('include', 'localhost');
    cy.wait(2000);
  });

  it('1080p', () => {
    cy.viewport(1980, 1080);
    cy.visit('http://localhost:4200', { timeout: 10000 });
    cy.url().should('include', 'localhost');
    cy.wait(2000);
  });

  it('Macbook 15', () => {
    cy.viewport('macbook-15');
    cy.visit('http://localhost:4200', { timeout: 10000 });
    cy.url().should('include', 'localhost');
    cy.wait(2000);
  });
});

// cypress clears cookies and localStorage before each test
// to prevent sharing their state across tests.
