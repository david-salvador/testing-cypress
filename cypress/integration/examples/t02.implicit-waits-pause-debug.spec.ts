// Mocha
// describe is a way to group tests in Mocha

describe('implicit waits pause debug 02_01', () => {
  // test step unit
  // do not go beyond 8 per describe to ease debugging

  it('should wait for 3 seconds', () => {
    cy.visit('http://localhost:4200');
    cy.wait(3000);
  });

  it('should pause execution', () => {
    cy.pause(); // Paused until resume button is clicked on the ui.
  });

  it('should check correct element on page: div.toolbar', () => {
    cy.get('.toolbar').should('be.visible');
  });
});
