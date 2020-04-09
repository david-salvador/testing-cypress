import { VoteComponent } from './vote.component'; 

describe('0500 VoteComponent', () => {
  var component: VoteComponent; 

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('01 should trigger voteChanged event when upvoded', () => {
    let totalVotes:number = null;    
    component.voteChanged.subscribe(tv=> totalVotes = tv);

    component.upVote();

    //expect(totalVotes).not.toBeNull(); //too generic
    expect(totalVotes).toBe(1);

  });
});