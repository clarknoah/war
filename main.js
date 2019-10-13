console.log("it works!");





class Player{
  constructor(){
    this.cards = [];
    this.playerName = Math.random().toString(36).substring(7);
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
    this.cardsInPlay = [];
    this.playersInPlay = [];
    this.warPlayers = [];
    this.spoilsOfWar = [];
    this.warIsDeclared = false;
    for(let i=1;i<=numberOfPlayers; i++){
      this.addPlayer();
    }
    this.shuffle();
    this.distributeCards();
  }

  //Creates a player
  addPlayer(){
    this.players.push(new Player);
  }
  createDomCard(card){
    var cardText = `${card.card} of ${card.suit}`;
    var cardElement = document.createElement('div');
    cardElement.className="card";

    var cardHeading = document.createElement("h1");
    var cardSubHeading = document.createElement("h4");
    cardSubHeading.innerHTML = `Player: ${this.players[card.player].playerName}`;
    cardHeading.innerHTML = cardText;
    cardElement.appendChild(cardHeading);
    cardElement.appendChild(cardSubHeading);

    var main = document.querySelector(".cards");

    main.appendChild(cardElement);
  }

  clearCards(){
    var main = document.getElementsByTagName("main")[0];
    main.innerHTML = "";
  }

  //Shuffles Deck
  shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }

  }

  //Distributes cards evenly to all players
  distributeCards(){
    for(let i=0, j=0; i < this.cards.length; i++){
      if(j===this.players.length){
        j=0;
      }
      var card = this.cards[i];
      this.players[j].cards.push(card);
      j++;
    }
  }

  //Begins the actual game
  startGame(){
    console.log('Game has started');
    this.evaluateWinner();
  }

  //Determines which cards will be used for the turn
  assignCardsInPlay(){

    if(this.warPlayers.length!==0){
      console.log(`---------------------------------------------- War Round --------------------------------------------------`);
      for(let i=0; i < this.warPlayers.length; i++){
        var player = this.warPlayers[i].player;
        var card = this.players[player].cards.pop();
        console.log(`Player ${this.players[player].playerName} plays: ${card.card} of ${card.suit}`);
        card.player=player;
        this.cardsInPlay.push(card);
      }
      this.warPlayers = [];
    }else {
      console.log(`-------- Regular Round ---------`);
      for(let i=0; i < this.players.length; i++){
        var card = this.players[i].cards.pop();
        console.log(`Player ${this.players[i].playerName} plays: ${card.card} of ${card.suit}`);
        card.player=i;
                this.createDomCard(card);
        this.cardsInPlay.push(card);
      }
    }

  }

  //Contains the logic to determine who has the highest card,
  //as well as determine if a War situation arises
  conductTurn(){
    this.clearCards();
    console.log(`------------------------ Turn Has Begun ----------------------------`);
    this.printPlacing();
    //Move active card into play area and assign the player index to card
    //to know whos card is whos
    this.assignCardsInPlay();

    var highestCard = {value:-1};



    for(let i=0; i < this.cardsInPlay.length; i++){
      var currentCard = this.cardsInPlay[i];

      if(currentCard.value > highestCard.value){
        highestCard = currentCard;
        this.warIsDeclared = false;

      }else if(currentCard.value === highestCard.value && this.warIsDeclared === false){
        this.warPlayers.push(currentCard);
        this.warPlayers.push(highestCard);
        this.warIsDeclared = true;

      }else if(currentCard.value === highestCard.value && this.warIsDeclared === true){
        this.warPlayers.push(currentCard);
      }
    }
    if(this.warPlayers.length>2){
      alert("Found one!");
    }
    if(this.warIsDeclared===false){
      if(this.warPlayers.length!==0){
        this.resolveWar(highestCard.player);
      }
      console.log(`Highest Card is Player ${this.players[highestCard.player].playerName} with ${highestCard.card} of ${highestCard.suit}`);
      this.resolveTurn(highestCard.player);
      this.evaluateWinner();
    }else{
      console.log(`War is declared`);
      for(let i=0; i<this.warPlayers.length; i++){
        var card = this.warPlayers[i];
        console.log(`Player ${this.players[card.player].playerName} has ${card.card} of ${card.suit}`);
      }
      this.warDeclared();
    }





  }

  printPlacing(){
    console.log(`----------- Game Status -------------`);
    for(let i=0; i<this.players.length; i++){
      console.log(`Player ${this.players[i].playerName} has ${this.players[i].cards.length} cards`);
    }
  }

  resolveWar(winner){
    for(let i=0; i<this.spoilsOfWar.length;i++){
      this.players[winner].cards.unshift(this.spoilsOfWar[i]);
    }
    this.spoilsOfWar = [];
    this.warPlayers = [];

  }
  //Distributes cards to winneR
  resolveTurn(winner){
    //add cards in play to beginning of winners deck
    if(this.spoilsOfWar.length!==0){
      for(let i=0; i<this.spoilsOfWar.length;i++){
        var card = this.spoilsOfWar[i];
        this.players[winner].cards.unshift(card);
      }
    }
    console.log(`Winner of round was Player ${this.players[winner].playerName}`);
    for(let i=0; i<this.cardsInPlay.length;i++){
      var card = this.cardsInPlay[i];
      this.players[winner].cards.unshift(card);
    }
    this.cardsInPlay = [];
    this.warPlayers = [];
    this.spoilsOfWar = [];
    this.printPlacing();

  }

  warDeclared(){

    //Add cardsInPlay to spoils
    this.spoilsOfWar = this.spoilsOfWar.concat(this.cardsInPlay);

    this.cardsInPlay = [];
    console.log(this.spoilsOfWar.length);

    //for all participating players, add to the spoils
    var playersOutOfCards = [];
    var playersWithCards = [];
    for(let i=0; i<this.warPlayers.length; i++){
      var playerIndex = this.warPlayers[i].player;
      var cardsStillOwed = 3;
      if(this.players[playerIndex].cards.length > 3){
        this.spoilsOfWar.push(this.players[playerIndex].cards.pop());
        this.spoilsOfWar.push(this.players[playerIndex].cards.pop());
        this.spoilsOfWar.push(this.players[playerIndex].cards.pop());
        playersWithCards.push(playerIndex);
      }else{
        console.log(`Player ${this.players[playerIndex].playerName} is out of the Game`);
        playersOutOfCards.push(playerIndex);
        this.spoilsOfWar.concat(this.players[playerIndex].cards);

      }

    }
    if(this.warPlayers.length === 2 && playersOutOfCards.length === 1){
      this.resolveTurn(playersWithCards[0]);
      this.evaluateWinner();
      return;
    }
    console.log(`The Spoils of War:`);
    console.log(this.spoilsOfWar);
    this.evaluateWinner();
  }
  //Ran at the end of a turn to determine if the game should continue
  evaluateWinner(){
    var removeList = [];
    for(let i=0; i<this.players.length;i++){
      var player = this.players[i];
      if(player.cards.length===0){
        removeList.push(i);
        //this.players.splice(i,1);
      }
    }
    removeList = removeList.reverse();
    for(let i = 0; i<removeList.length;i++){
      this.players.splice(removeList[i],1);
    }
    if(this.players.length === 1){
      this.endGame();
    }else{
      console.log("The Show Must Go On");
      //this.conductTurn();
    }
  }

  endGame(){
    console.log("The game is over!");
  }
}


 var game = new War(2);
 game.evaluateWinner();


/*

1: Determine Number of Players

2: Divy Up cards evenly between each player

3:

7: Evaluate following conditions
  1. If one player has the best card
    1. Add cards to winners deck
  2. if Top cards are even

*/
