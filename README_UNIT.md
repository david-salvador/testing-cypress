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
---
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
---
### 27. Async Utilitities: because setTimeout is not so maintainable.
As `async` operations make it hard to know when the test is going to be completed.

Utilities to handle async op's in `components` and `services`?
> [async-examples.spec.ts](./src/app/components/courses/home/async-examples.spec.ts) : a test suite not linked to any angular implementation, for reference.

> see 4-(26, 27)
---
### 28. fakeAsync 
fakeSync: testing zone; allows simulating passing of time :-)

1. it will autodetect all async operations have __COMPLETED__ b4 considering the test __COMPLETED__. 

Detects activation|pressence of: `setTimeout`, `setInterval`, `requestAnimationFrame`, browser async APIs, browser async events (animations) `DOM`, and __others__, __`Promises`__, __`Observables`__.

1. when __COMPLETED__ will then update the __DOM view__ to reflect the completed-updated data.

> __notion__ of detecting async operations (setTimeout, setInterval,...) to enable us to act after those complete, in angular context is __'zones'__: a context that survives multiple asynchronous operations. Implemented by `zone.js` library of `angular`. Used in change-detection mechanism. See [zone.js in github](github.com/angular/zone.js).

So to run our tests in a zone that will:
1. detect __all__ async operations (browser & code) triggered by our test block.
1. wait for __all__ their completion __before__ considering spec __completed__.
1. is more flexible than jasmine's `done()`.

#### __tick(n)__: 
Within the __fakeAsync zone__ passing of time is via `tick(timeInMs)` API (angular core testing).

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

#### __flush()__ 
flush() empties the task queue, without need to define the period in ms the clock forward; it will finish __ALL__ timeout|async s.

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

---
### 29 Testing `Promise` based code

Promises are more lightweight for the browser to handle async operations _(than setTimeout, ...)_, as they run in the separate micro-tasks queue, rather than the macro-tasks event loop queue.

> alert!: Notice the order of execution by the js runtime, of micro-tasks and (macro-tasks)tasks. There are 2 tasks queues for async tasks:

micro-tasks queue | (macro-tasks)tasks queue
--- | --- 
`promise`s | `setTimeout`
- | `setInterval`
- | ajax calls
- | mouse clicks
- | other browser operations...
--- | ---
 added to their own separate uTasks queue | added to the event loop
 between each, the browser does **not** get to update the view DOM| between each one, the browser rendering engine gets a chance to update the DOM

> `Promise.resolve().then(...)` creates an inmediately resolved promise, takes priority|precedence over `setTimeout` (goes into micro-tasks queue)

```typescript
it('Asynchronous test example - plain Promise', () => {
// it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('Creating promise');

    setTimeout(()=> { // karma adds this to the tasksQ
        console.log('setTimeout() first callback triggered');
    })
    setTimeout(()=> { // k adds this to the taskQ
        console.log('setTimeout() 2nd callback triggered');
    })

    Promise.resolve().then(() => { // k adds this to the uTaskQ
        console.log('Promise first then() evaluated ok');
        return Promise.resolve(); // this adds a new promise to the uTasksQ
    })
    .then(() => {
        console.log('Promise second then() evaluated ok');
        test = true; // flag set here for test assertion
    });
    // flushMicrotasks(); // <-- after this, uTasks have been processed, emptied

    console.log('Running test assertions');
    expect(test).toBeTruthy();
}));
```
[async-examples.spec.ts](./src/app/components/courses/home/async-examples.spec.ts)
```c
FAILS!!

Creating promise
Promise first then() evaluated ok
Promise second then() evaluated ok
Running test assertions
setTimeout() first callback triggered
setTimeout() 2nd callback triggered

```
Emptying the uTasksQ resolves all promises scheduled.

___

### 30 Using fakeAsync to work with Promises & flushMicrotasks()

Previous test failed, test must resolve the async operations before considering test complete. Now with fakeAsync() we will run the test in fakeAsync zone.

To execute all the uTasks in the uTasksQ, before running the assertions. To flush only the uTasks (_without needing to advance time or flush the tasksQ_): the `flushMicrotasks()` test utility:

```typescript
it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('Creating promise');
    Promise.resolve().then(() => { // k adds this to the uTaskQ
        console.log('Promise first then() evaluated ok');
        return Promise.resolve(); // this adds a new promise to the uTasksQ
    })
    .then(() => {
        console.log('Promise second then() evaluated ok');
        test = true; // flag set here for test assertion
    });
    flushMicrotasks(); // <-- after this, uTasks have been processed, emptied

    console.log('Running test assertions');
    expect(test).toBeTruthy();
}));
```
[async-examples.spec.ts](./src/app/components/courses/home/async-examples.spec.ts)

Now the test passes, both promises in the promise chain have been evaluated. Notice how the flag is set in the 2nd promise in the promise chain. Even if another promise got triggerd, it will be resolved, until the uTaskQ is emptied completely, before continuing, in a synchronous-looking way.
___
### 31 Full-Example
- How to test code that uses both asynchronous operations task queues.
- When, and Why, to call the multiple utilities available : `flushMicrotasks()`, `tick()`, `flush()`, etc.

__Example__ Promise, when resolved calls timeout which updates `count`, and then run assertions after all these async op's have executed.

```typescript
it('04p+t Asynchronous test example - Promises+setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
        .then(() => {
            counter+=10;
            setTimeout(() => {
                counter += 1;
            }, 1000);
        });

    expect(counter).toBe(0);
    
    flushMicrotasks();

    expect(counter).toBe(10);
    tick(500); // allows to progressivey triggering timeouts
    expect(counter).toBe(10);
    // tick(499);
    // expect(counter).toBe(10);
    // tick(1);
    tick(500); // now a whole second have 
    expect(counter).toBe(11);
}));
```

- How to trigger the `Promise`, but not the `setTimeout`. 
- Between two uTasks the browser does not have the chance to updating the DOM.

---
### 32 fakeAsync to test Async Observable based code
```typescript
 _______
O_______) = = O
```

Angular test uitilities to test async Observables. 
1. controls passing of time
1. flushing of uTasks & tasks queues

```typescript
it('05o Asynchronous test example - Observables', fakeAsync(() => {

  let test = false; // the assertable flag of interest

  console.log('Creating Observable');

  const test1$ = of('whatever');

  test1$.subscribe(() => { // this is sinchronously executed
    test = true;
  });

  console.log('Running test assertions 1');
  expect(test).toBe(true);

  test = false;

  const test2$ = of('something').pipe(
    delay(1000) // internally calls setTimeout, and so delays the emision of 'something' by one second
  );

  test2$.subscribe(() => { // now it takes one second to receive value
    test = true;
  });

  tick(1000); // and so we need move the time fwd 1s

  console.log('Running test assertions 2');

  expect(test).toBe(true);

}));
```

So, it is similar to testing async operations that use setTimeout.
___
### 33. fakeAsync in Practice - Fixing the HomeComponent tests

- [app/components/courses/home.c.ts](./src/app/components/courses/home/home.component.ts)
- [app/components/courses/home.c.spec.ts](./src/app/components/courses/home/home.component.spec.ts)

Utilities allow code to be writen in a synchronous looking way.

Whenever the advanced tab button is clicked:
1. the advanced courses are displayed instead of the beginners courses.
1. the beginners courses are not displayed


```typescript
describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let el: DebugElement;
    let coursesService: any;

    const beginnerCourses = setupCourses()
        .filter(course => course.category == 'BEGINNER');

    const advancedCourses = setupCourses()
        .filter(course => course.category == 'ADVANCED');

    // async wraps in a test zone, and only considers the test completed
    // when all triggered tasks in both queues are emptied
    beforeEach(async(() => {

        // create a mock object that will return test data
        const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

        TestBed.configureTestingModule({
            imports: [
                CoursesModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: CoursesService, useValue: coursesServiceSpy }
            ]
        }).compileComponents() // this is asynchronous
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
                coursesService = TestBed.get(CoursesService);
            });
    }));

     it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

        // using the spied mocked version of coursesService to mock a response test data.
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        // apply the changes on the DOM with the list of courses
        fixture.detectChanges(); // apply change-detection functionality

        // we would expect to have two tabs, with Beginners tab active
        // we query the dom for the list of tab buttons, [].
        const tabs = el.queryAll(By.css(".mat-tab-label"));

        // simulate click on the 2nd tab of the arry, "advanced"
        click(tabs[1]);

        // run changeDetection mechanism
        fixture.detectChanges();

        // requestAnimationFrame async API prevents synchronous readable code, which is solved by setting a fakeAsync zone, and by emptying the 2 types of task queues with `flush`:
        flush(); // because timer from reqAnimFrame is not uTask
        // could have used tick(16) but it would require inner knowledge

        const cardTitles = el.queryAll(By.css('.mat-card-title'));

        expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");

        expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
    }));

});

```

___
### 34 `beforeEach(async ( ...`  _(vs fakeAsync)_

flush() does not work in async test zone... 
- no control on the emptying of the queues; 
- nor allowed tick(n) to control time.
- we can not write assertons in a sync looking way :-(

yet the zone will track all async ops, and will give callback,
we can then run test assertions => test fixture.whenStable

```typescript
...
    // alternative way using async
    it("should display advanced courses when tab clicked - async", async(() => {
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));
        fixture.detectChanges();
        const tabs = el.queryAll(By.css(".mat-tab-label"));
        
        click(tabs[1]);
        fixture.detectChanges();

        // flush() does not work in async test zone... no control on the
        // emptying of the queues; nor allowed tick(n) to control time.
        // we can not write assertons in a sync looking way :-(
        // yet the zone will track all async ops, and will give callback,
        // we can then run test assertions => test fixture.whenStable
        fixture.whenStable().then(() => {

            console.log("called whenStable() ");

            const cardTitles = el.queryAll(By.css('.mat-card-title'));

            expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");

            expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

        });

    }));
...
```

__async__: wraps the code block in a test zone.
What differences `fakeAsync` and `async`?

__conclusion__: `async` is not as convenient as `fakeAsync`

When to use async then? Why does it exist?

utilities | fakeAsync | async
--- | --- | --- 
detecting __all__ async operations made inside the wrapped block. example: `compileComponents().then() | yes | yes
fine control over the `flush()` emptying of micro-tasks, and tasks(macro-tasks), __queues__ | yes | no
can call `tick()` to control passage of time | yes | no
suports mocking __actual HTTP requests to Backend__ => __not unit-tests__ but __integration__ tests. | no | yes

__Conclusion__ :
Use `async` in the `beforeEach`, in the compiling of modules.

* json loading, mocking HTTP requests
* when a __unit-test__ nneds to mock a HTTP req to BEnd. It, `async`,
* when css/html is not bundled by the CLI | |

Use `fakeAsync` in all other cases.

[back to README](./README.md)