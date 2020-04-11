import { VoteComponent } from './vote.component'; 

describe('0300 VoteComponent', () => {


  let component:VoteComponent;

  //set up
  beforeAll(()=>{

  });

  beforeEach(() => {
    component = new VoteComponent(); //Arrange
  });

  //tear down
  afterEach(()=>{

  });

  afterAll(()=>{

  });

  it('01 should increment totalVotes when upvoted', () => {
   
    //Act
    component.upVote();
    //Assert
    expect(component.totalVotes).toBe(1);
  });

  it('05 should decrement totalVotes when downvoted', () => {

    //Act
    component.downVote();
    //Assert
    expect(component.totalVotes).toBe(-1);
  });
});