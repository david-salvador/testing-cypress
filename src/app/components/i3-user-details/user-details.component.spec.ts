/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsComponent } from './user-details.component';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs'; // for feeding values into ActivatedRouteStup params observable :-)

describe('Suite: Integration - UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('TC 100 > should create', () => {
    expect(component).toBeTruthy();
  });

  // save() {     this.router.navigate(['users']);  }
  it('TC 105 > should redirect to users page after saving', () => {
    const router = TestBed.get(Router);
    // navigate is already a fake method, so no need to call .and.callFake
    // only check that it has been called
    const spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });

  // ensure we have a route configured for this path 'users'
  it('TC 110 > should redirect to not-found page if invalid user id', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 0 }); // invalid value

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});

class RouterStub {
  // fummy implementation, only need methods on component under test
  navigate(params) {}
}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  // params:Observable<any> = Observable.empty(); //not good for TC 110
  get params() {
    // looks like a method but it is a public property
    return this.subject.asObservable(); // we expose the subject as an observable to the outer world
  }
}
