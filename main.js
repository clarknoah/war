console.log("it works!");


class player{
  constructor(){

  }
}



class War{
  constructor(numberOfPlayers){
    this.players = [];
    this.cards = [
      {
        suit:'Club',
        card: "2",
        value: 0
      },
      {
        suit:'Club',
        card: "3",
        value: 1
      },
      {
        suit:'Club',
        card: "4",
        value: 2
      },
      {
        suit:'Club',
        card: "5",
        value: 3
      },
      {
        suit:'Club',
        card: "6",
        value: 4
      },
      {
        suit:'Club',
        card: "7",
        value: 5
      },
      {
        suit:'Club',
        card: "8",
        value: 6
      },
      {
        suit:'Club',
        card: "9",
        value: 7
      },
      {
        suit:'Club',
        card: "10",
        value: 8
      },
      {
        suit:'Club',
        card: "Jack",
        value: 9
      },
      {
        suit:'Club',
        card: "Queen",
        value: 10
      },
      {
        suit:'Club',
        card: "King",
        value: 11
      },
      {
        suit:'Club',
        card: "Ace",
        value: 12
      },
      {
        suit:'Heart',
        card: "2",
        value: 0
      },
      {
        suit:'Heart',
        card: "3",
        value: 1
      },
      {
        suit:'Heart',
        card: "4",
        value: 2
      },
      {
        suit:'Heart',
        card: "5",
        value: 3
      },
      {
        suit:'Heart',
        card: "6",
        value: 4
      },
      {
        suit:'Heart',
        card: "7",
        value: 5
      },
      {
        suit:'Heart',
        card: "8",
        value: 6
      },
      {
        suit:'Heart',
        card: "9",
        value: 7
      },
      {
        suit:'Heart',
        card: "10",
        value: 8
      },
      {
        suit:'Heart',
        card: "Jack",
        value: 9
      },
      {
        suit:'Heart',
        card: "Queen",
        value: 10
      },
      {
        suit:'Heart',
        card: "King",
        value: 11
      },
      {
        suit:'Heart',
        card: "Ace",
        value: 12
      },
      {
        suit:'Diamond',
        card: "2",
        value: 0
      },
      {
        suit:'Diamond',
        card: "3",
        value: 1
      },
      {
        suit:'Diamond',
        card: "4",
        value: 2
      },
      {
        suit:'Diamond',
        card: "5",
        value: 3
      },
      {
        suit:'Diamond',
        card: "6",
        value: 4
      },
      {
        suit:'Diamond',
        card: "7",
        value: 5
      },
      {
        suit:'Diamond',
        card: "8",
        value: 6
      },
      {
        suit:'Diamond',
        card: "9",
        value: 7
      },
      {
        suit:'Diamond',
        card: "10",
        value: 8
      },
      {
        suit:'Diamond',
        card: "Jack",
        value: 9
      },
      {
        suit:'Diamond',
        card: "Queen",
        value: 10
      },
      {
        suit:'Diamond',
        card: "King",
        value: 11
      },
      {
        suit:'Diamond',
        card: "Ace",
        value: 12
      },
      {
        suit:'Spade',
        card: "2",
        value: 0
      },
      {
        suit:'Spade',
        card: "3",
        value: 1
      },
      {
        suit:'Spade',
        card: "4",
        value: 2
      },
      {
        suit:'Spade',
        card: "5",
        value: 3
      },
      {
        suit:'Spade',
        card: "6",
        value: 4
      },
      {
        suit:'Spade',
        card: "7",
        value: 5
      },
      {
        suit:'Spade',
        card: "8",
        value: 6
      },
      {
        suit:'Spade',
        card: "9",
        value: 7
      },
      {
        suit:'Spade',
        card: "10",
        value: 8
      },
      {
        suit:'Spade',
        card: "Jack",
        value: 9
      },
      {
        suit:'Spade',
        card: "Queen",
        value: 10
      },
      {
        suit:'Spade',
        card: "King",
        value: 11
      },
      {
        suit:'Spade',
        card: "Ace",
        value: 12
      }
    ];

    for(let i=0;i<=numberOfPlayers; i++){
      this.addPlayer();
    }
  }

  //Creates a player
  addPlayer(){

  }


  //Shuffles Deck
  shuffle(){
    
  }

  //Distributes cards evenly to all players
  distributeCards(){
    for(let i=0;i<this.cards.length; i++){

    }
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
