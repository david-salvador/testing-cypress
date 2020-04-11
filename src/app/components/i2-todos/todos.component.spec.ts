/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodosComponent } from './todos.component';

import { TodoService } from './todo.service';
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs'; //not from the optimization-lightweight 'rxjs/Observable', which forces me to import also the operators i will use in these tests(not production code :-)

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below. 

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ TodosComponent ],
      providers :[ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TC I2 101 - should load todos from the server', ()=>{
    //get a reference to the service injected in our component, if dependency is singleton provided at (app) module level (providers:...) {20}
    //let service = fixture.debugElement.injector.get(TodoService) // too noisy
    let service = TestBed.get(TodoService);
    spyOn(service, 'getTodos').and.returnValue(Observable.from([ [1,2,3] ])) //needs Observable, imagine server returns array of 3 items
    
    fixture.detectChanges();  //1. fixture.detectChanges() in beforeEach() calls ngOnInit-> service already called, and too late to provide 
                              //2. an alternative service method to return a hardcoded array (spyOn)
    expect(component.todos.length).toBe(3); 
                                            

  });
});
