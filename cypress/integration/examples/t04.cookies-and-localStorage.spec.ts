describe('browser cookies and localStorage ', () => {
  it('navigate to localhost:4200', () => {
    cy.visit('http://localhost:4200', { timeout: 10000 });
    cy.url().should('include', 'localhost');

    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies({ log: true });
    cy.clearLocalStorage('keyName');
  });
});

// cypress clears cookies and localStorage before each test
// to prevent sharing their state across tests.
