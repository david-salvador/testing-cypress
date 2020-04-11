import { getCurrencies } from './getCurrencies';

describe('suite:getCurrencies ',()=>{
    
        it('test: 1201: it should return supported currencies',()=>{
            
            const result:string[] = getCurrencies();
            expect(result).toContain('EUR');//tests should not be fragile, :the order does not matter
            expect(result).toContain('USD');//tests should not be fragile, :the order does not matter
            expect(result).toContain('AUD');//tests should not be fragile, :the order does not matter
        })//test or specs
    
        
    
    
    
    }) //suite