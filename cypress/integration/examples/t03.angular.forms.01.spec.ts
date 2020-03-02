describe('browser-actions 01_03_01 form ui interactions ', () => {
  it('navigate to localhost:4200', () => {
    cy.visit('http://localhost:4200', { timeout: 10000 });
    cy.url().should('include', 'localhost');
  });

  it('should fill username invalid, show error', () => {
    cy.get('#login__form__username').clear(); // BestPractice_FORM_432
    cy.get('#login__form__username')
      .type('invalid user name', { delay: 30 })
      .blur();
    // cy.tick(20);
    cy.get('.field__username #error__message')
      .should('be.visible')
      .and('contain.text', 'Use only letters and numbers');
    cy.log('----- Error contains:  Use only letters and numbers');
  });

  it('should fill username valid, no error shown', () => {
    cy.get('#login__form__username').clear(); // BestPractice_FORM_432
    cy.get('#login__form__username')
      .type('validUserName', { delay: 30 })
      .blur();
    // cy.tick(20);
    cy.get('.field__username #error__message').should('not.be.visible');
  });

  it('should fill password invalid, show error ', () => {
    cy.get('#login__form__password').clear(); // BestPractice_FORM_432
    cy.get('#login__form__password')
      .type('invalid user password')
      .blur();
    // cy.tick(20);
    cy.get('.field__password #error__message').should('be.visible');
  });

  it('should fill password valid, no error shown', () => {
    cy.get('#login__form__password').clear(); // BestPractice_FORM_432
    cy.get('#login__form__password')
      .type('validPassword01')
      .blur();
    // cy.tick(20);
    cy.get('.field__password #error__message').should('not.be.visible');
  });

  it('should submit button be disabled with wrong username or password', () => {
    cy.get('#login__form__username').clear();
    cy.get('#login__form__password').clear();
    cy.get(
      '[data-cy=login__form__checkbox_acceptTermsAndConditions]'
    ).within(() => cy.get('input[type=checkbox]').as('acceptTC'));

    cy.get('@acceptTC').uncheck({ force: true });

    cy.get('[data-cy=login__form__button__submit]').should('be.disabled');

    cy.get('@acceptTC').check({ force: true });

    // 00
    // username ok
    cy.get('#login__form__username')
      .type('validUserName01', {
        delay: 30,
      })
      .blur();
    cy.get('[data-cy=login__form__button__submit]').should('be.disabled');

    // password ok
    cy.get('#login__form__password')
      .type('validPassword01')
      .blur();
    cy.get('[data-cy=login__form__button__submit]').should('not.be.disabled');

    // 01
    // username no ok, pw ok
    cy.get('#login__form__username').clear();
    cy.get('#login__form__username')
      .type('invalid user name', {
        delay: 30,
      })
      .blur();
    cy.get('[data-cy=login__form__button__submit]').should('be.disabled');

    // 11
    // username no ok, password no ok
    cy.get('#login__form__password').clear();
    cy.get('#login__form__password')
      .type('invalid user password')
      .blur();
    cy.get('[data-cy=login__form__button__submit]').should('be.disabled');

    // 10
    // username ok, pw nok
    cy.get('#login__form__username').clear();
    cy.get('#login__form__username')
      .type('validUserName01', {
        delay: 30,
      })
      .blur();
    cy.get('[data-cy=login__form__button__submit]').should('be.disabled');

    // username ok, pw ok
    cy.get('#login__form__password').clear();
    cy.get('#login__form__password')
      .type('validPassword01')
      .blur();
    cy.get('[data-cy=login__form__button__submit]').should('not.be.disabled');

    // checkbox true required for form ok
    cy.get('@acceptTC').uncheck({ force: true });
    cy.wait(400);

    cy.get('[data-cy=login__form__button__submit]').should('be.disabled');

    cy.get('@acceptTC').check({ force: true });

    // cy.get('[data-cy=login__form__button__submit]').click();
  });

  // it('should submit login form ', () => {});
  // it('should  show error', () => {});
});

/*

cy.get('#mat-checkbox-1-input').click({ force: true });
//**** OR ***********
cy.get('#mat-checkbox-1').find('input').click({ force: true });

  */

// describe('browser-actions 01_01 simple test with cypress', () => {
//   // test step unit
//   // do not go beyond 8 per describe to ease debugging

//   it('should load correct url', () => {
//     cy.visit('http://localhost:4200');
//   });

//   it('should load in less than 10s', () => {
//     cy.visit('http://localhost:4200', { timeout: 10000 });
//   });

//   it('should check correct url', () => {
//     cy.url().should('include', 'localhost');
//   });

//   it('should check correct element on page: div.toolbar', () => {
//     cy.get('.toolbar').should('be.visible');
//   });
//
