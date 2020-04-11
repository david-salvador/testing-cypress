import { async, TestBed , ComponentFixture} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { VoterComponent } from './voter.component';


describe('VoterComponent', () => {

  let component: VoterComponent;
  let voterComponentFixture: ComponentFixture<VoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   declarations:[ VoterComponent ]
    // });

    //to access the component aswell as its template etc... we ask angular to instantiate the component for us
    voterComponentFixture = TestBed.createComponent<VoterComponent>(VoterComponent);
    component = voterComponentFixture.componentInstance;

    //voterComponentFixture.nativeElement;  // DOM root element
    //voterComponentFixture.debugElement;   // wrapper around native element, we get methods for quering the DOM
    //...we can get change detection manually... injected dependencies in this component... 

    
  });
  
  it('TC I1 100 > should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1; //we should have 21
    voterComponentFixture.detectChanges();
    // <span class="vote-count">{{ totalVotes }}</span>    
    //query the dom using fixture
    let de:DebugElement = voterComponentFixture.debugElement.query(By.css('.vote-count'));//de debug element ...queryAll    
    //voterComponentFixture.debugElement.query(By.directive(VoterComponent));//we could also access by custom directive 
    let el:HTMLElement = de.nativeElement; //to get intelisense, since nativeElement is typed as any.

    expect(el.innerText).toContain('21');
  });


  it('TC I1 105 > should highlight the upvote button if I have upvoted', () => {
    component.myVote = 1;
    voterComponentFixture.detectChanges();//run change detection
    //class="glyphicon glyphicon-menu-up vote-button"
    //[class.highlighted]="myVote == 1" 
    let de:DebugElement = voterComponentFixture.debugElement.query(By.css('.glyphicon-menu-up'));
    //this time we don't need nativeElement, just existence of the class

    expect(de.classes['highlighted']).toBeTruthy();


  });

  //(click)="upVote()"> ... after I upvote by clicking,... i want to access the i element and check that total votes in increased
  it('TC I1 110 > should increase total votes when i click the upvote button', () => {
    let de:DebugElement = voterComponentFixture.debugElement.query(By.css('.glyphicon-menu-up'));
    de.triggerEventHandler('click', null);

    expect(component.totalVotes).toBe(1); //we already tested that .vote-count renders component.totalVotes, no need to repeat for no extra-value
  });
  
  it('TC I1 110 > should increase total votes when i click the upvote button', () => {

  });

});
