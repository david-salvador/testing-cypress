import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XyzUserListComponent } from './components/user-list/user-list.component';
import { ErrorHandler, NO_ERRORS_SCHEMA } from '@angular/core';
import { XyzErrorHandlerService } from './shared/error-handler.service';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    // configure our in-test app module,
    // and all dependencies our component might need.
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,

        BrowserAnimationsModule,
      ],
      declarations: [AppComponent, XyzUserListComponent],
      schemas: [NO_ERRORS_SCHEMA], // to ignore unknowns, if too complex layout, ow do not as <app-nav2 won't be picked up
      providers: [{ provide: ErrorHandler, useClass: XyzErrorHandlerService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();  // calls ngOnInit [!]
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'testing-cypress'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('testing-cypress');
  });

  it('should render Login form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content h1').textContent).toContain(
      'Login'
    );
  });

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to app!'
    );
  }));

  it('should have a router outlet', () => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).not.toBeNull();
  });

  /*
  it('should have a link to /todos page', () => {
    let des:DebugElement[] = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    // <a href="/todos">
    //console.log(des.length, '->', JSON.stringify(des[0].properties));
    //console.log(des.length, '->', JSON.stringify(des[0].attributes));
    //console.log(des.length, '->', JSON.stringify(des[0]));
    //let index = des.findIndex(de => de.properties['href'] === '/todos') ;
    let index = des.findIndex(de => de.attributes['routerLink'] === 'todos') ;

    expect(index).toBeGreaterThan(-1);

    //let href = fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href');
    //let href = fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('routerLink');
    //console.log('>>',fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('routerLink'));
    //expect(href).toEqual('todos');

  })*/
});
