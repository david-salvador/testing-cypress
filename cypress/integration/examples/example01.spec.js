// Mocha
// describe is a way to group tests in Mocha

describe('describe block 01_01 simple test with cypress', () => {
  // test step unit
  // do not go beyond 8 per describe to ease debugging

  it('true should be true -> pass', () => {
    expect(true).to.equal(true);
  })

  // it('5 should be 5 -> fail', () => {
  //   expect(5).to.equal(4);
  // })

})

// describe('describe block 01_02', () =>{})
describe('describe block 01_02', () =>{
  it('5 should be 5 -> ok', () => {
    expect(5).to.equal(5);
  })

})
