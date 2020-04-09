# TestingCypress

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

```
npx @angular/cli new testing-cypress
cd testing-cypress
```

## Setting up a ngrx project

```
// setting up ngrx: schematics, store, effects, router-store, entity and dev-tools
npm install @ngrx/schematics --save-dev
npm install @ngrx/store @ngrx/effects @ngrx/router-store @ngrx/entity --save
npm install @ngrx/store-devtools --save-dev

// wiring up basic
node .\node_modules\@angular\cli\bin\ng g @ngrx/schematics:store State --root --module app
node .\node_modules\@angular\cli\bin\ng g @ngrx/schematics:effect App --root --module app.module.ts
```

## Setting up Angular Material

```
ng add @angular/material
```

# Unit Testing

To catch regression errors(introduced by evolution) by:

1. detecting broken code at object or function level
1. clarifying code intent

in small chunks. But not DOM User Interaction, which is more efficient in e2e.

## with Jasmine(testing framework) + Karma(test runner)

Most common causes of errors are:

1. `import` or `export` statements missing.
1. `providers` or `selectors` forgotten.
1. imported class has no instance.
1. async errors unhandled.
1. Dependency Injection missespellings.

Observables can be cryptic to diagnose, as Angular executes within zones: scoped execution contexts, chunks of code together even if asynchronous. One zone per stack. Child zones can reference parent's but not viceversa.

Dependency Injection: Because angular emits errors on execution and not when importing/exporting files at compile time, traces may go back to undefined variables. Code editors help.

Decorators are functions that return functions, adding metadata, helping with dependency injection, and are invoked at runtime with arguments. Common errors: missing parentheses, missing properties, values, adding a semicolon at then end of the decorator.

### To Run the Development Backend Server

We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

### To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

## Key Elements

### TestBed

Configures our in-test app module, and to resolve all dependencies our component might need.

```typescript
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));
  ...
});
```

### ComponentFixture

Gives privileged access to the component itself, and its state.

### By

Allows to search DOM elements by css class etc.

```

```

### DebugElement

Allows access to the components dom structure.

# End-to-End, Integration Tests

To catch ux and ui errors:

1. at component and webpage level
1. at the end-user experience level

Example: to verify that clicking x button on X context, always leads to "y" app behaviours. What the users can, and can not, do in x conditions.

## Protractor e2e

run with
`npx ng e2e`

### element

to interact with dom elements

### by

to select dom elements by css

## Cypress 4.x e2e

[link > Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html)

> Targeting ui **DOM** elements by `tag`, `class` or `id` is very volatile and highly subject to change. You may swap out the element, you may refactor CSS and update ID’s, or you may add or remove classes that affect the style of the element.
>
> Instead, adding the `data-cy` attribute to the element gives us a targeted selector that’s only used for testing.
>
> The `data-cy` attribute will not change from CSS style or JS behavioral changes, meaning it’s not coupled to the behavior or styling of an element.

```html
<button
  id="login__form__button__submit"
  data-cy="login__form__button__submit"
  [disabled]="!loginForm.valid"
>
  Login
</button>
```

```typescript
*.spec.ts

cy.get('[data-cy=login__form__button__submit]').should('be.disabled');
```

## Setup

```
npm i cypress --save-dev
```

### IDE intellisense code completion

To prevent erros.

```
npx cypress open

To help you get started...
We've added some folders and example tests to your project.
Try running the tests in the examples folder or add your own
test files to cypress/integration.

```

This creates `cypress.json`, and `/cypress` folder. Close the chromium window that just opened.

1. Within `/cypress` folder create new file: `tsconfig.json`

```
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": "../node_modules",
    "types": ["cypress"]
  },
  "include": ["**/*.*"]
}
```

# Managing tests

## unit scripts

To launch the angular test server, compile .ts code, and watch our files for changes.
`npx ng test`

## e2e scripts

1. spin up the ui app

```
"cy:open": "cypress open",
```

1. run tests in headless mode

```
"cy:run": "cypress run",
```

1. For visual regression testing.

```
"cy:": "cypress ",
```

1. For Cucumber BDD testing.

```
"cy:": "cypress ",
```

### fixtures subfolder

External static data for our tests to feed from, to support desired scenarios.

### integration subfolder

Where all tests live, includes examples to quickstart and reference.

### plugins subfolder

Enable external 3rd-party extensions libraries, cucumber pre-processors, image snapshots library.

### support subfolder

#### index.js

1. Convenience Mechanism, runs before every single .spec file. No need to import it in spec files.

1. Central place for custom commands.!

## Browser support

Chrome, Firefox and MS Edge.

## Main Differentiators

1. smart automatic waiting on all selectors
   before it makes an action on that so the tests are very stable and robust.
   .. Less lines of code so you can develop your test much faster.
   2.tests can be video recorded so test can be published for later reference.
   3.real time reloads function: When code is changed the corresponding test will run automatically, no need to retrigger scripts.

# Code

## Mocha

See tests in `cypress\integration\examples`

### Cypress UI mode

Run them with `npm run cy:open`

### Headless mode

`npm run cy:run`

```typescript
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
```

tables
Markdown | Less | Pretty
--- | --- | ---
_Still_ | `renders` | **nicely**
1 | 2 | 3

---

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

images
Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')

# Development section

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Annex

## Prettier

To prevent conflicts in code reviews.

### setup

```
npm i prettier --save-dev
```

### configuration file

Linting rules that gover file format on save.
.prettierrc

example of personal preferences to be agreed with team members:

```
{
  "semi": true,
  "singleQuote": true,
  "useTabs": true,
  "tabWidth": 2,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "es5" // trims when possible
}
```
