import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";

import { DebugElement } from '@angular/core';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      //imports: [RouterTestingModule],
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to /todos page', () => {
    let des:DebugElement[] = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    // TypeError: Cannot read property 'properties' of undefined if not imports: [RouterTestingModule.withRoutes([])], above!!!
    // <a href="/todos"> 
    let index = des.findIndex(de => de.properties['href'] === '/todos') ;
    expect(index).toBeGreaterThan(-1);
    //console.log(des.length);
    //console.log(des.length, '->', JSON.stringify(des[0].properties));
    //console.log(des.length, '->', JSON.stringify(des[0].attributes));
    //console.log(des.length, '->', JSON.stringify(des[0]));
    //let index = des.findIndex(de => de.attributes['routerLink'] === 'todos') ;


    //let href = fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href');
    //let href = fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('routerLink');
    //console.log('>>',fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('routerLink'));
    //expect(href).toEqual('todos');

  })



});
