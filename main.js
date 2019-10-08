console.log("it works!");


class War{
  constructor(numberOfPlayers){
    for(let i=0;i<=numberOfPlayers; i++){
      this.addPlayer();
    }
  }

  //Creates a player
  addPlayer(){

  }

  

  //Begins the actual game
  startGame(){
    console.log('Game has started');
  }


}

/*

1: Determine Number of Players

2: Divy Up cards evenly between each player

3: Determine which player goes first

4: First player lays out card

5: Second Player lays out card

6: third player lays out card

7: Evaluate following conditions
  1. If one player has the best card
    1. Add cards to winners deck
  2. if Top cards are even

*/
