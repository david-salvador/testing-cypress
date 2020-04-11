import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('0600 TodosComponent with Injected Service, plus ngOnInit with SpyOn', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null); //we cheat here, and pass null. It does not matter because we will not use it anyway.
    component = new TodosComponent(service); //another approach, to unit-test components that use services... would be to create a fake implementation of the service, called "a stub"
  });

  it('00 should set todos property with the items returned from the server', () => {
    //arrange
    let todos = [ 
         {id:1, title:'a'},
         {id:2, title:'b'},
         {id:3, title:'c'}
       ];
    spyOn(service,'getTodos').and.callFake(()=>{
      //return Observable.from([ [1,2,3] ]);
      // return Observable.from([ [ //though this does not add any value
      //   {id:1, title:'a'},
      //   {id:2, title:'b'},
      //   {id:3, title:'c'}
      // ] ]);
      return Observable.from([ todos ]);
    })

    component.ngOnInit();

    //expect(component.todos.length).toBeGreaterThan(0);//general
    //expect(component.todos.length).toBe(3);//more specific
    expect(component.todos).toBe(todos);//super specific    
  });

  it('05 should call the server to save the change when new todo item is added',() =>{
    //because we dont really want to call the server
    //add method takes a todo and returns and Observable
    let spy:jasmine.Spy = spyOn(service,'add').and.callFake(t => { 
      return Observable.empty();//we don't care what is returned from the server
    })

    component.add();

    //assertion that service.add is called, how?
    expect(spy).toHaveBeenCalled();
  });
  
  //2. 10.x service add method returns object and it should be captured in component  
  it('10.1 should add the new todo returned from the server',() =>{    
    let iTodo = {id:1};
    let spy:jasmine.Spy = spyOn(service,'add').and.callFake(t => { 
      return Observable.from([iTodo]);
    })

    component.add();

    expect(component.todos.indexOf(iTodo)).toBeGreaterThan(-1);    
  });

  it('10.2 should add the new todo returned from the server -- alternative way',() =>{    
        let iTodo = {id:1};
        let spy:jasmine.Spy = spyOn(service,'add').and.returnValue( Observable.from([iTodo]) );
    
        component.add();
    
        expect(component.todos.indexOf(iTodo)).toBeGreaterThan(-1);        
  });

  //3. if service returns an error, the error should be put in the message property
  it('15 should set the message property if server returns an error when adding a new todo',() =>{    
    
        let errorFromServer = 'error from the server';    

        let spy:jasmine.Spy = spyOn(service,'add').and.returnValue( Observable.throw(errorFromServer) );
    
        component.add();
    
        expect(component.message).toBe(errorFromServer);        
  });

  //to delete
  //4.
  it('40 should call the server to delete a todo item if the user confirms',() =>{    
            
        let spy1:jasmine.Spy = spyOn(window,'confirm').and.returnValue( true );
        let spy2:jasmine.Spy = spyOn(service,'delete').and.returnValue( Observable.empty() );//empty observable as we don't care what is returned from the server
    
        component.delete(1);
    
        expect(spy2).toHaveBeenCalledWith(1);//specific since we check id sent to service is not overwritten
  });

  //4.
  it('45 should not call the server to delete a todo item if the user cancels in the confirm box',() =>{    
    
    let spy1:jasmine.Spy = spyOn(window,'confirm').and.returnValue( false );
    let spy2:jasmine.Spy = spyOn(service,'delete').and.returnValue( Observable.empty() );//empty observable as we don't care what is returned from the server

    component.delete(1);

    expect(spy2).not.toHaveBeenCalled();//specific since we check id sent to service is not overwritten
  });


});