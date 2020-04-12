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


## Asynchronous Unit Testing (with Jasmine)

### 26. done()

> **Problem**: after `click()`, wiven with `fixture.detectChanges()` *(see 25)* ... changes are not reflected in DOM, and so __asserts fail__. 

Cause: While switching tabs, the tab component performs async operations. The animation produced by `window.requestAnimationFrame(cb)`, from the native browser API. 

>__note__: the browser has built-in/native asynchronous APIs.
```
- window.requestAnimationFrame(callBackFunction)
- setTimeout()  // 
- setInterval() // to call sth @ regular intervals
- fetch() // http Req's, browser built-in, promise based, may take seconds.
- ...
```

> see mdn: call back function is guaranteed to be called before next browser re-paint

The container is goint to 1st wait  for the callback passed to request animation frame __TO COMPLETE__ before applying DOM changes, and so __asserts fails__.

#### Solution 1: setTimeout
```typescript
setTimeout( ()=> {

}, 500); // 500ms should be enough time for animations to end for asserts to work :-] -> FAILS
```

ERRORS: in the console. Assertions executed after tests COMPLETED.

#### Solution 2: done()
```typescript
it('_01 Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;
    // sync tests

    setTimeout( ()=> {
        // gamma
        // async tests
        console.log('running assertions');
        test = true;
        expect(test).toBeTruthy();

        done(); // placed after all assertions have been executed!.
    })
})
```
>[async-examples.spec.ts](./src/app/components/courses/home/async-examples.spec.ts)
>The mere pressence of an argument indicates fasmine that this is an __async__ test; so ti will not consider itself __ended__ after running the __sync__. The gamma section, needs to call the done() method before the default 5s timeout!.

> __Problem__: setTimeout is not so maintainable

### 27. Async Utilitities: because setTimeout is not so maintainable.


Utilities to handle async op's in `components` and `services`?
> [async-examples.spec.ts](./src/app/components/courses/home/async-examples.spec.ts) : a test suite not linked to any angular implementation, for reference.

> see 4-(26, 27)

### 28. fakeAsync 
fakeSync: testing zone; allows simulating passing of time :-)

1. it will autodetect all async operations have __COMPLETED__ b4 considering the test __COMPLETED__.
1. when __COMPLETED__ will then update the __DOM view__ to reflect the completed-updated data.

> __notion__ of detecting async operations (setTimeout, setInterval,...) to enable us to act after those complete, in angular context is __'zones'__: a context that survives multiple asynchronous operations. Implemented by `zone.js` library of `angular`. Used in change-detection mechanism. See [zone.js in github](github.com/angular/zone.js).

So to run our tests in a zone that will:
1. detect __all__ async operations (browser & code) triggered by our test block.
1. wait for __all__ their completion __before__ considering spec __completed__.
1. is more flexible than jasmine's `done()`.

__tick__: Within the __fakeAsync zone__ passing of time is via `tick(timeInMs)` API (angular core testing).

```typescript
it('02 Asynchronous test example - setTimeout() + tick()', fakeAsync(() => {
    let test = false;

    setTimeout(() => { // gamma
        console.log('running assertions setTimeout()');
        test = true;
    }, 1000);

    tick(1000); // <-- move the clock!!! to make sure gamma is run.
    expect(test).toBeTruthy();

}));
```
[async-examples.spec.ts](./src/app/components/courses/home/async-examples.spec.ts)

__Main Benefit__ `:-)`: And so, we do not need to run asserts within nested code blocks, but code tests in a synchronous looking way.




```typescript
it('02 Asynchronous test example - setTimeout()', fakeAsync(() => {
        let test = false;

        setTimeout(() => {
        });

        setTimeout(() => {
            console.log('running assertions setTimeout()');
            test = true;
        }, 1000);

        flush();

        expect(test).toBeTruthy();

    }));
```
[async-examples.spec.ts](./src/app/components/courses/home/async-examples.spec.ts)


```typescript
it('Asynchronous test example - plain Promise', fakeAsync(() => {

    let test = false;

    console.log('Creating promise');

    Promise.resolve().then(() => {

        console.log('Promise first then() evaluated successfully');

        return Promise.resolve();
    })
    .then(() => {

        console.log('Promise second then() evaluated successfully');

        test = true;

    });

    flushMicrotasks();

    console.log('Running test assertions');

    expect(test).toBeTruthy();

}));
```
[async-examples.spec.ts](./src/app/components/courses/home/async-examples.spec.ts)




# markdown references
tables
Markdown | Less | Pretty
--- | --- | ---
_Still_ | `renders` | **nicely**
1 | 2 | 3

---



images
Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')