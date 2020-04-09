import { XyzUserListService } from './user-list.service';

import { TestBed, async, inject } from '@angular/core/testing';

// suite described
describe('XyzUserListService', () => {
  // instance of the instance we want to test
  // let service: XyzUserListService;

  // the async function wraps the code in an asynchronous testing zone
  // this pauses execution of the code until the testing zone resolves

  beforeEach(async(() => {
    // service = new XyzUserListService();

    // we now instantiate a module using the TestBed class, which
    // allow to instantiate components, services, classes as if with
    // decorators.
    TestBed.configureTestingModule({
      providers: [XyzUserListService],
    });
  }));

  // within it functions is where all testing logic is contained
  //   it('should return a User List with 16 users', done => {
  //     service.get().then(response => {
  //       expect(response.length).toBe(16);
  //       done();
  //     });
  //   }, 4000); // by default jasmine waits 5s for async work to finish
  it('should return a User List with 16 users', async(
    inject([XyzUserListService], (service: XyzUserListService) => {
      service.get().then(response => {
        expect(response.length).toBe(16);
      });
    })
  ));
});
