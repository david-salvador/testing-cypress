import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I1GreeterComponent } from './i1-greeter.component';

describe('I1GreeterComponent', () => {
  let component: I1GreeterComponent;
  let fixture: ComponentFixture<I1GreeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I1GreeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I1GreeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
