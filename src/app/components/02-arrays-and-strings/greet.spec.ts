import { greet } from './greet';

describe('suite: greet',()=>{
    
        it('test: 1101: should include the name in the message',()=>{
            const name:string = 'dave!';    
            const result:string = greet(name);
            expect(result).toContain(name);//tests should not be fragile
        })//test or specs
    
        
    
    
    
    }) //suite