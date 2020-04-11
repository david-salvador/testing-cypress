import { compute } from './compute';

describe('suite: compute',()=>{

    it('test: 1000: should return 0 if input is negative',()=>{
        const result = compute(-1);
        expect(result).toBe(0);
    })//test or specs

    it('test: 1002: should increment if input is non-negative',()=>{
        const result = compute(0);
        expect(result).toBe(1);
    })//test or specs



}) //suite


