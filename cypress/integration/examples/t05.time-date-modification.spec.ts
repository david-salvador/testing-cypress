describe('browser time and date modifications ', () => {
  it('navigate to localhost:4200', () => {
    cy.visit('http://localhost:4200', { timeout: 10000 });
    cy.url().should('include', 'localhost');
  });

  it('should overwrite current time', () => {
    const testDateTimestamp = new Date(2020, 3, 1).getTime();
    cy.clock(testDateTimestamp);
    cy.log(`time updated to ${testDateTimestamp}`);
  });
});

// cypress clears cookies and localStorage before each test
// to prevent sharing their state across tests.
